#!/usr/bin/env bash
#
# upgrade.sh — bring unnerfcc up to a new Claude Code release, fully standalone.
#
# This is the MAINTAINER flow (install.sh is the end-user apply flow). It:
#   1. resolves the TARGET version — the newest CC available on npm (or --version),
#      NOT whatever is installed — and fetches that exact binary into a temp
#      prefix if needed, so it runs whether or not CC is installed and never
#      touches your global install,
#   2. unpacks the CC native binary to its JS bundle          (vendored native I/O),
#   3. extracts a fresh prompt catalog, seeded with our previous one
#      so unchanged/reworded prompts keep their ids           (vendored extractor),
#   4. SHA-256-diffs new vs previous to find the relabel worklist,
#   5. **launches Claude Code headless to semantically label** the new/changed
#      fragments the extractor couldn't identify,
#   6. validates the catalog (structural gates),
#   7. reconstructs the stock .md set + replays the un-nerfs  (existing scripts),
#   8. verifies the un-nerfs still apply to the binary        (vendored patcher),
#   9. leaves everything staged for you to review + commit.
#
# It does NOT depend on the tweakcc-fixed project: extract/re-package the binary
# (engine/bun-binary.mjs), un-minify (engine/beautify.mjs), extract the catalog
# (engine/extract-prompts.mjs), and patch (engine/patch-prompts.mjs) are all OUR OWN
# code. The AI steps (classify, relabel, bucket-analyze) run on Gemini by
# default and on the `claude` CLI with LLM_PROVIDER=claude — see LLM_PROVIDER
# below.
#
# BUN FORMAT: if engine/bun-binary.mjs reports the binary's Bun container format is
# one it doesn't understand, this script STOPS — update engine/bun-binary.mjs for
# the new layout.
#
# USAGE
#   ./upgrade.sh [--version X.Y.Z] [--force] [--no-patch-verify] [--benchmark[=N]] [--yes]
#
# LLM_PROVIDER=gemini|claude  which model runs classify/relabel/bucket-analyze
#   (default gemini; needs GOOGLE_GEMINI_API_KEY in the environment, ./.env, or
#   ~/.env). GEMINI_MODEL overrides the model id (default gemini-3.8-flash).
#
# --benchmark[=N]: after a clean upgrade, run the SWE-bench harness on the STOCK
#   and just-PATCHED binaries and update the accuracy bar chart in README.md
#   (default N=10). OPT-IN and HEAVY: needs Docker + ~50GB disk + hours; it is
#   best-effort and never fails the upgrade. See scripts/benchmark.mjs.
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

NATIVE_CLI="$REPO/engine/bun-binary.mjs"
PATCH_CLI="$REPO/engine/patch-prompts.mjs"
BUCKET_ANALYZE="$REPO/scripts/bucket-analyze.mjs"
ENGINE_DIR="$REPO/engine"
SCRIPTS_DIR="$REPO/scripts"
PROMPTS_DIR="$REPO/data/prompts"
SYS_PROMPTS="$REPO/system-prompts"

FORCE=0; PATCH_VERIFY=1; ASSUME_YES=0; WANT_VERSION=""; BENCHMARK=0; BENCH_N=10
while [ $# -gt 0 ]; do
  case "$1" in
    --version) WANT_VERSION="$2"; shift 2;;
    --force) FORCE=1; shift;;
    --no-patch-verify) PATCH_VERIFY=0; shift;;
    --benchmark) BENCHMARK=1; shift;;
    --benchmark=*) BENCHMARK=1; BENCH_N="${1#*=}"; shift;;
    --yes|-y) ASSUME_YES=1; shift;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0;;
    *) echo "unknown arg: $1" >&2; exit 2;;
  esac
done

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m  ✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m  !\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mupgrade.sh: %s\033[0m\n' "$*" >&2; exit 1; }
bun_incompatible() {
  printf '\033[1;31m\n╔══════════════════════════════════════════════════════════════╗\n'
  printf   '║  BUN FORMAT INCOMPATIBLE — engine/bun-binary.mjs could not parse ║\n'
  printf   '║  this Claude Code binary. Bun likely changed its standalone   ║\n'
  printf   '║  container format. Update the format constants/logic in       ║\n'
  printf   '║  engine/bun-binary.mjs for the new layout (its header documents  ║\n'
  printf   '║  the format; a current tweakcc-fixed is a useful reference).  ║\n'
  printf   '╚══════════════════════════════════════════════════════════════╝\033[0m\n' >&2
  printf 'detail: %s\n' "$1" >&2
  exit 3
}

# True if $1 is a binary this tool has already patched. The un-nerf sentinels are
# plain text in the module blob, so a raw grep of the executable finds them; no
# stock build contains any of them. Used to refuse to unpack our own output.
is_unnerfed() {
  local s
  for s in "senior-engineer standard" "never trade away rigor, depth, or correctness" \
           "thorough, clear, and rich with explanation"; do
    grep -qaF "$s" "$1" 2>/dev/null && return 0
  done
  return 1
}

# --- preconditions ----------------------------------------------------------
command -v node >/dev/null || die "node not found"
command -v python3 >/dev/null || die "python3 not found"
# NOTE: `claude` is NOT required to be installed — we fetch the target binary
# ourselves (see below). It's only used, if present, for the semantic relabel
# step; otherwise the freshly-fetched binary stands in.
[ -f "$NATIVE_CLI" ] || die "engine/bun-binary.mjs missing — is the repo intact?"
# Check EVERY load-bearing dep, not just the first one ever added: a repo cloned
# (or last upgraded) before @babel/generator became required has a populated
# node_modules that a node-lief-only test would wrongly call complete, and the
# patcher would then die mid-run. @babel/generator is what writes the patched AST
# back out to source, so it is as load-bearing as the parser.
if [ ! -d "$ENGINE_DIR/node_modules/node-lief" ] || [ ! -d "$ENGINE_DIR/node_modules/@babel/generator" ]; then
  log "Installing engine/ dependencies (node-lief, @babel/parser, @babel/generator, prettier)"
  ( cd "$ENGINE_DIR" && npm install )
fi

# Install scripts/ deps too (gray-matter, used by sync-version.mjs at step 5) —
# a repo whose only prior run was install.sh (which bootstraps engine/ + scripts/)
# vs. one whose first run is upgrade.sh both need this; missing it here crashes
# step 5 with ERR_MODULE_NOT_FOUND after the (expensive, AI-driven) classify and
# relabel steps have already completed, which is the worst place to fail.
if [ ! -d "$SCRIPTS_DIR/node_modules/gray-matter" ]; then
  log "Installing scripts/ dependencies (first run: gray-matter)"
  ( cd "$SCRIPTS_DIR" && npm install --ignore-scripts --save-exact )
fi

# Which model runs the three AI steps: classify, relabel, bucket-analyze. All
# three scripts speak both providers (scripts/llm-provider.mjs). gemini is the
# default because it is what this pipeline was measured on — 3m16s against a
# backlog that extrapolated to ~4.8h through the claude CLI. LLM_PROVIDER=claude
# selects the agentic `claude -p` path instead: it can grep the unpacked bundle
# to disambiguate a hard string, where gemini gets everything inlined into one
# non-agentic request. GEMINI_MODEL overrides the model id (llm-provider.mjs
# reads that straight from the environment, so it needs no flag here); the key
# check below reports back whichever model id that resolves to, so the banner
# names the model actually used rather than a second copy of the default.
#
# Both the name and the key are resolved among the preconditions, before the
# version probe and the ~100MB binary fetch below: the AI steps are separated by
# minutes of download and extraction, so a bad provider name or a missing key
# that only surfaced at relabel would waste all of it. Same lookup the scripts
# themselves use (environment, ./.env, ~/.env), so agreeing here means agreeing
# there.
LLM_PROVIDER="${LLM_PROVIDER:-gemini}"
case "$LLM_PROVIDER" in
  claude|gemini) ;;
  *) die "LLM_PROVIDER must be 'claude' or 'gemini' (got: '$LLM_PROVIDER')";;
esac
if [ "$LLM_PROVIDER" = "gemini" ]; then
  GEMINI_MODEL_RESOLVED="$(node -e 'import("./scripts/llm-provider.mjs").then(m=>{if(!m.findGeminiApiKey(process.cwd()))process.exit(1);console.log(m.DEFAULT_GEMINI_MODEL)}).catch(()=>process.exit(1))')" \
    || die "LLM_PROVIDER=gemini but GOOGLE_GEMINI_API_KEY was not found — checked the environment, $REPO/.env, and ~/.env. Set it, or re-run with LLM_PROVIDER=claude."
fi

# --- resolve the TARGET version (works whether or not CC is installed) ------
# upgrade.sh's job is to ADD un-nerf support for the newest Claude Code, so the
# target is the newest AVAILABLE release (npm) — not whatever happens to be
# installed — unless --version pins one. We fetch that exact version's binary
# ourselves below, so nothing needs to be installed first.
log "Resolving target Claude Code version"
mkdir -p "$PROMPTS_DIR"

# Newest COMPLETE catalog on disk, optionally excluding one version.
#
# A run that dies anywhere between gen-catalog (step 2) and the final repack
# (step 6) leaves a half-built prompts-<v>.json behind, and that file must not
# be mistaken for a finished one. gen-catalog is preceded by `touch
# prompts-<v>.json.incomplete` and the marker is removed only once step 6 has
# passed, so the marker's presence is exactly "this catalog is mid-build".
# Treating a half-built catalog as real breaks the next run two ways: it
# satisfies the already-supported check (the run silently no-ops), and it can be
# picked as the carry-forward seed (every id "carries" from a catalog whose new
# entries are still anonymous, so the diff reports `removed 0` and the whole
# curated-id reuse path is skipped — the same failure the exclude-the-target
# guard below exists to prevent).
#
# `.candidates.json` sidecars live in the same dir and match the same glob, so
# they must be filtered out or `sort -V | tail -1` can select one and yield a
# bogus SUPPORTED_LATEST like "2.1.219.candidates".
latest_complete_catalog() {
  local exclude="${1:-}" c v
  for c in $(ls "$PROMPTS_DIR"/prompts-*.json 2>/dev/null | grep -vE '\.candidates\.json$' | sort -V || true); do
    [ -e "$c.incomplete" ] && continue
    v="$(basename "$c" | sed -E 's/prompts-(.*)\.json/\1/')"
    [ -n "$exclude" ] && [ "$v" = "$exclude" ] && continue
    printf '%s\n' "$c"
  done | tail -1
}

# Newest version we already ship a catalog for. (The carry-forward seed is
# re-resolved below, once CC_VERSION is known — see PREV_CATALOG there.)
PREV_CATALOG="$(latest_complete_catalog)"
SUPPORTED_LATEST=""
[ -n "$PREV_CATALOG" ] && SUPPORTED_LATEST="$(basename "$PREV_CATALOG" | sed -E 's/prompts-(.*)\.json/\1/')"

# Newest published CC (best-effort; network).
NPM_LATEST="$(npm view @anthropic-ai/claude-code version 2>/dev/null | tail -1 || true)"

# Currently-installed CC, if any (reused as-is when it already matches target).
INSTALLED_VERSION=""
if command -v claude >/dev/null 2>&1; then
  INSTALLED_VERSION="$(claude --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
fi

# Target: --version wins; else the newest available on npm; else (offline) the
# installed version.
if [ -n "$WANT_VERSION" ]; then
  CC_VERSION="$WANT_VERSION"
elif [ -n "$NPM_LATEST" ]; then
  CC_VERSION="$NPM_LATEST"
elif [ -n "$INSTALLED_VERSION" ]; then
  CC_VERSION="$INSTALLED_VERSION"
  warn "could not query npm (offline?) — falling back to the installed v$CC_VERSION"
else
  die "cannot determine a target version: npm unavailable and no Claude Code installed. Pass --version X.Y.Z."
fi

[ -n "$SUPPORTED_LATEST" ] && ok "newest catalog we ship: v$SUPPORTED_LATEST" \
                           || warn "no completed catalog in $PROMPTS_DIR — gen-catalog needs one to seed id carry-forward (see the seed resolution below)."
[ -n "$NPM_LATEST" ] && ok "newest on npm: v$NPM_LATEST"
[ -n "$INSTALLED_VERSION" ] && ok "installed: v$INSTALLED_VERSION"
ok "target version: v$CC_VERSION"

# Nothing-to-do: we already have a FINISHED catalog for the target and no
# --force. A catalog left behind by a run that died mid-pipeline does not count
# — resume it instead of reporting success and doing nothing.
if [ -f "$PROMPTS_DIR/prompts-$CC_VERSION.json" ]; then
  if [ -e "$PROMPTS_DIR/prompts-$CC_VERSION.json.incomplete" ]; then
    warn "a previous run for v$CC_VERSION did not finish — regenerating its catalog (classification results already in data/string-catalog.json are reused, not re-billed)."
  elif [ "$FORCE" -eq 0 ]; then
    ok "already support v$CC_VERSION — nothing to do (use --force to regenerate, or --version to target another release)."
    exit 0
  fi
fi
if [ -n "$SUPPORTED_LATEST" ] && [ "$CC_VERSION" != "$SUPPORTED_LATEST" ]; then
  newer() { [ "$1" != "$2" ] && [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | tail -1)" = "$1" ]; }
  newer "$CC_VERSION" "$SUPPORTED_LATEST" \
    && log "adding support for v$CC_VERSION (newer than our latest v$SUPPORTED_LATEST)" \
    || warn "target v$CC_VERSION is OLDER than our latest catalog v$SUPPORTED_LATEST — regenerating it anyway"
fi

NEW_CATALOG="$PROMPTS_DIR/prompts-$CC_VERSION.json"
SEED_FROM_SELF=0

# The carry-forward seed is preferably the PREVIOUS release's catalog, never a
# half-built one. An interrupted run leaves an anonymous-entry
# prompts-$CC_VERSION.json on disk, and seeding from that silently destroys the
# sync: every id is "carried" from a catalog whose new entries are still
# anonymous, so the diff reports `removed 0`, relabel's removed-id pool comes
# back EMPTY, and the whole curated-id reuse path is skipped. The .incomplete
# marker is what tells the two apart, so latest_complete_catalog() can exclude
# exactly the dangerous case.
PREV_CATALOG="$(latest_complete_catalog "$CC_VERSION")"
if [ -n "$PREV_CATALOG" ]; then
  ok "carry-forward seed: $(basename "$PREV_CATALOG")"
elif [ -f "$NEW_CATALOG" ] && [ ! -e "$NEW_CATALOG.incomplete" ]; then
  # Nothing older survives — the normal state after a successful sync, since
  # step 6b prunes every superseded catalog. Re-syncing a version whose OWN
  # catalog is complete can safely seed from it: it is fully labeled, so every
  # id carries because nothing actually moved, which is precisely what a --force
  # re-run of an already-synced version means. (Copied into $WORK below so
  # gen-catalog is never reading the file it is writing.)
  ok "carry-forward seed: prompts-$CC_VERSION.json (this version's own completed catalog — no older one survives pruning)"
  SEED_FROM_SELF=1
else
  die "no catalog to seed id carry-forward from: $PROMPTS_DIR has no completed prompts-*.json. Restore one from git (git checkout -- $PROMPTS_DIR) — gen-catalog cannot assign curated ids without a seed."
fi

WORK="$(mktemp -d "${TMPDIR:-/tmp}/unnerfcc-upgrade-$CC_VERSION-XXXX")"
CLI_JS="$WORK/cli-js"  # a directory (one file per Bun module) since v2.1.251's multi-module build; see engine/bun-binary.mjs unpackToDir
# Only discard the work dir on SUCCESS. It holds the relabel chunks and the
# Claude-authored labels-*.json — hours of model output that cannot be
# regenerated cheaply. Wiping it on a failed run turns a recoverable validation
# error (e.g. "N prompt(s) still anonymous" out of 1500) into a full re-label.
trap 'st=$?; if [ "$st" -eq 0 ]; then rm -rf "$WORK"; else warn "work dir PRESERVED for recovery: $WORK"; fi' EXIT

# --- obtain the target native binary ---------------------------------------
# Reuse an already-installed binary at the target version; otherwise fetch that
# EXACT version into a temp prefix under $WORK — the maintainer's global install
# is never touched (install.cjs's postinstall materializes bin/claude.exe from
# the platform-matching optional dep).
#
# The installed binary is only usable if it is STOCK. On any machine that has run
# ./install.sh it is unnerfcc's OWN patched build, and unpacking that feeds our
# un-nerfed prose back in as if it were Anthropic's: classify sees ~100 unknown
# strings and stores our own replacement text as newly-classified prompts,
# gen-catalog then admits them as new prompts and reports the stock originals
# they displaced as removed, and relabel dies on duplicate names. Nothing
# downstream can tell the difference, so the check has to happen here. Grepping
# the raw binary for the un-nerf sentinels is enough: they are plain text in the
# module blob and appear in no stock build.
log "Resolving the v$CC_VERSION native binary"
CC_BIN=""
if [ "$INSTALLED_VERSION" = "$CC_VERSION" ] && command -v claude >/dev/null 2>&1; then
  LAUNCHER="$(command -v claude)"
  CC_BIN="$(readlink -f "$LAUNCHER" 2>/dev/null || echo "$LAUNCHER")"
  if [ -f "$CC_BIN" ] && is_unnerfed "$CC_BIN"; then
    warn "installed v$CC_VERSION is unnerfcc's own patched build — fetching a stock copy instead (unpacking a patched binary would poison the catalog with our own un-nerfs)."
    CC_BIN=""
  elif [ -f "$CC_BIN" ]; then
    ok "using installed binary: $CC_BIN (v$CC_VERSION, stock)"
  else
    CC_BIN=""
  fi
fi
if [ -z "$CC_BIN" ]; then
  command -v npm >/dev/null || die "need the v$CC_VERSION binary but npm is unavailable to fetch it"
  log "Fetching Claude Code v$CC_VERSION (temp prefix — your global install is untouched)"
  DL="$WORK/cc"; mkdir -p "$DL"
  npm install --prefix "$DL" "@anthropic-ai/claude-code@$CC_VERSION" \
      --no-audit --no-fund --loglevel=error \
    || die "npm could not fetch @anthropic-ai/claude-code@$CC_VERSION"
  CC_BIN="$DL/node_modules/@anthropic-ai/claude-code/bin/claude.exe"
  [ -f "$CC_BIN" ] || die "fetched the package but the native binary is missing at $CC_BIN (postinstall may have failed — unsupported platform?)"
  RES="$("$CC_BIN" --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || true)"
  [ "$RES" = "$CC_VERSION" ] || warn "fetched binary reports v$RES (expected v$CC_VERSION) — continuing"
  ok "fetched binary: $CC_BIN (v${RES:-?})"
fi

# A working `claude` for the semantic relabel step: the installed one if present,
# else the binary we just fetched (stock CC — fine for an AI relabel call; it
# shares ~/.claude auth).
CLAUDE_FOR_RELABEL="$(command -v claude 2>/dev/null || echo "$CC_BIN")"
# Pinned, not inherited: relabel decides the `<id>.md` filenames every un-nerf
# rule is keyed to, so it gets the same model as classification. Leaving this to
# whatever default is configured would silently degrade the run.
RELABEL_MODEL="${RELABEL_MODEL:-claude-opus-5}"

if [ "$LLM_PROVIDER" = "gemini" ]; then
  ok "AI steps (classify, relabel, bucket-analyze): gemini ($GEMINI_MODEL_RESOLVED)"
else
  ok "AI steps (classify, relabel, bucket-analyze): claude CLI ($RELABEL_MODEL)"
fi

# --- 1. unpack the binary (Bun-format-change aware) ------------------------
log "Unpacking JS bundle from the native binary"
set +e
UNPACK_OUT="$(node "$NATIVE_CLI" unpack "$CC_BIN" "$CLI_JS" 2>&1)"; RC=$?
set -e
echo "$UNPACK_OUT" | grep -q "BUN_FORMAT_INCOMPATIBLE" && bun_incompatible "$UNPACK_OUT"
[ $RC -eq 3 ] && bun_incompatible "$UNPACK_OUT"
[ $RC -eq 0 ] || die "unpack failed (rc=$RC): $UNPACK_OUT"
echo "$UNPACK_OUT" | grep -qE "version=$CC_VERSION" || warn "unpacked JS version tag != $CC_VERSION (continuing)"
# CLI_JS is now a directory of one file per Bun module, so total size comes
# from unpack's own "bytes=<n>" stdout line (summed across the blob it parsed)
# rather than `wc -c` on a single file.
UNPACK_BYTES="$(echo "$UNPACK_OUT" | grep -oE 'bytes=[0-9]+' | grep -oE '[0-9]+' || echo 0)"
UNPACK_MODULES="$(echo "$UNPACK_OUT" | grep -oE 'modules=[0-9]+' | grep -oE '[0-9]+' || echo '?')"
ok "unpacked $(awk -v b="$UNPACK_BYTES" 'BEGIN{printf "%.1fMB", b/1048576}') of JS across $UNPACK_MODULES module(s)"

# --- 1b. classify new strings via Claude (prompt/non-prompt + un-nerf) ------
# SHA-256-fingerprint every string; only strings NEW to this build (or prompts
# judged under an older un-nerf policy version) are sent to the model. The store
# (data/string-catalog.json) persists, so this is cheap on a normal upgrade and
# only large on the one-time bootstrap.
log "Classifying new strings via $LLM_PROVIDER (cached by SHA-256)"
# classify.mjs's own "ONE JOB, NOT MANY" policy puts every pending string in a
# single Claude call by default (--batch 0) — right for a normal release's few
# hundred new fragments, but a single spawnSync call is hard-capped at 30 min
# (engine timeout, kills with SIGTERM/143 past it), and classify.mjs's own
# comment names --batch N as the sanctioned escape hatch for exactly "an
# oversized bootstrap": a version jump large enough to accumulate thousands of
# new strings (observed: ~34 strings/min including bundle-grep lookups, so
# 11k+ pending strings cannot finish in one 30-minute call). CLASSIFY_BATCH
# keeps each call comfortably under that ceiling; below it, a batch this size
# never triggers (the whole pending set fits in one chunk, unchanged from
# today), so this is a no-op for every normal release. Under gemini there is no
# spawnSync cap to survive, but the batch still bounds how many result objects
# one response has to carry, so the same size is kept for both providers.
CLASSIFY_BATCH="${CLASSIFY_BATCH:-300}"
PENDING="$(node "$REPO/scripts/classify.mjs" "$CLI_JS" "$CC_VERSION" --provider "$LLM_PROVIDER" --dry-run 2>/dev/null | grep -oE '"toClassify":[0-9]+' | grep -oE '[0-9]+' || echo '?')"
if [ "$PENDING" = "0" ]; then
  ok "no new strings — classification store is current"
elif [ "$PENDING" -gt 2000 ] && [ "$ASSUME_YES" -eq 0 ]; then
  warn "$PENDING strings need classifying (a first-run bootstrap — a large $LLM_PROVIDER job, chunked at $CLASSIFY_BATCH/call)."
  printf '  Run it now? [y/N] '; read -r a
  case "$a" in [yY]*) node "$REPO/scripts/classify.mjs" "$CLI_JS" "$CC_VERSION" --provider "$LLM_PROVIDER" --batch "$CLASSIFY_BATCH" 2>&1 | sed 's/^/  /' || warn "classification incomplete (store is resumable)";;
    *) warn "skipped — run 'node scripts/classify.mjs $CLI_JS $CC_VERSION --provider $LLM_PROVIDER --batch $CLASSIFY_BATCH' later";; esac
else
  node "$REPO/scripts/classify.mjs" "$CLI_JS" "$CC_VERSION" --provider "$LLM_PROVIDER" --batch "$CLASSIFY_BATCH" 2>&1 | sed 's/^/  /' || warn "classification incomplete (store is resumable)"
  [ -f "$REPO/data/unnerf-candidates.json" ] && ok "un-nerf candidates for review: data/unnerf-candidates.json"
fi

# --- 2. extract a fresh catalog (seeded) -----------------------------------
# Mark the catalog mid-build BEFORE writing a byte of it, and leave the marker
# there until step 6 has verified the patched binary. Everything between here
# and there can fail, and until it passes, prompts-$CC_VERSION.json is a
# half-built artifact — see latest_complete_catalog() for what the marker
# protects against.
log "Extracting prompt catalog (seeded from previous for id carry-forward)"
if [ "$SEED_FROM_SELF" -eq 1 ]; then
  PREV_CATALOG="$WORK/seed-prompts-$CC_VERSION.json"
  cp "$NEW_CATALOG" "$PREV_CATALOG"
fi
: > "$NEW_CATALOG.incomplete"
node "$REPO/scripts/gen-catalog.mjs" "$CLI_JS" "$CC_VERSION" "$NEW_CATALOG" "$PREV_CATALOG"
ok "catalog: $NEW_CATALOG"

# --- 3. diff + relabel worklist --------------------------------------------
if [ -n "${PREV_CATALOG:-}" ]; then
  log "SHA-256 diff vs previous catalog"
  node "$REPO/scripts/prompt-index.mjs" diff "$PREV_CATALOG" "$NEW_CATALOG" | sed 's/^/  /'

  log "Preparing relabel worklist"
  RL_WORK="$WORK/relabel"
  N=$(node "$REPO/scripts/relabel.mjs" prepare "$PREV_CATALOG" "$NEW_CATALOG" "$RL_WORK" | grep -oE 'worklist: [0-9]+' | grep -oE '[0-9]+' || echo 0)

  if [ "${N:-0}" -gt 0 ]; then
    # ONE job per chunk. A single job asked to emit ~1000 objects truncates and
    # the merge then hard-fails on missing refs; `collect` re-checks every ref
    # and we re-run only the chunks that came back short. On the claude path the
    # model is pinned, not inherited — relabel decides the `<id>.md` filenames
    # every un-nerf rule is keyed to, so leaving it to whatever default is
    # configured would silently degrade the run. Both paths write the same
    # labels-NNN.json, so collect/merge below are provider-blind.
    log "Labeling $N new/changed fragment(s) via $LLM_PROVIDER in $(ls "$RL_WORK"/chunk-*.json | wc -l) chunk(s)"
    for attempt in 1 2 3; do
      for chunk in "$RL_WORK"/chunk-*.json; do
        cn=$(basename "$chunk" .json); cn=${cn#chunk-}
        [ -f "$RL_WORK/labels-$cn.json" ] && continue   # already labeled (earlier attempt)
        log "  labeling chunk $cn (attempt $attempt)"
        if [ "$LLM_PROVIDER" = "gemini" ]; then
          node "$REPO/scripts/relabel.mjs" label "$RL_WORK" "$cn" || true
        else
          ( cd "$RL_WORK" && "$CLAUDE_FOR_RELABEL" -p --dangerously-skip-permissions \
              --model "$RELABEL_MODEL" \
              "Read LABELING-TASK.md in this directory and follow it EXACTLY. Your assigned chunk file is chunk-$cn.json and you MUST write your labels to labels-$cn.json in this directory (a JSON array with exactly one object per item in chunk-$cn.json, echoing each ref verbatim — refs are global indices, they do not start at 0). The un-nerf guide is $REPO/UNNERF-GUIDE.md ; the previous catalog is $PREV_CATALOG . Also read removed.json (ids that vanished this release — a reworded prompt appears as a removed id plus a new worklist item, and you MUST re-use its id verbatim or its un-nerf rule is orphaned). Do not ask questions; complete the task and write the file." ) || true
        fi
      done
      if node "$REPO/scripts/relabel.mjs" collect "$RL_WORK" "$NEW_CATALOG"; then break; fi
      [ "$attempt" = 3 ] && die "relabel incomplete after 3 attempts (see $RL_WORK)"
      log "  re-running short chunks"
      # Drop any labels file that is short/malformed so the loop retries it.
      for chunk in "$RL_WORK"/chunk-*.json; do
        cn=$(basename "$chunk" .json); cn=${cn#chunk-}
        node -e '
          const fs=require("fs");
          const [c,l]=process.argv.slice(1);
          if(!fs.existsSync(l)) process.exit(0);
          try{
            const want=JSON.parse(fs.readFileSync(c,"utf8")).map(i=>i.ref).sort((a,b)=>a-b);
            const got=[...new Set(JSON.parse(fs.readFileSync(l,"utf8")).map(o=>o.ref))].sort((a,b)=>a-b);
            if(JSON.stringify(want)!==JSON.stringify(got)) fs.unlinkSync(l);
          }catch{ fs.unlinkSync(l); }
        ' "$chunk" "$RL_WORK/labels-$cn.json"
      done
    done
    [ -f "$RL_WORK/labels.json" ] || die "relabel did not produce labels.json"
    log "Merging labels into the catalog"
    node "$REPO/scripts/relabel.mjs" merge "$NEW_CATALOG" "$RL_WORK/labels.json" "$NEW_CATALOG"
    ok "relabeled + merged $N fragment(s)"
  else
    ok "no fragments need relabeling (extractor identified everything)"
  fi

  # Did any reworded prompt gain/lose a brevity/effort nerf? Pairs prev vs new
  # catalog BY ID and compares each changed prompt's classified un-nerf status.
  # MUST run AFTER the relabel merge: matching is by exact hash, so a reworded
  # prompt has no entry in the new catalog until relabel re-attaches its old id.
  # Run before that and every reword is invisible — the check silently passes.
  log "Checking un-nerf status changes on reworded prompts"
  node "$REPO/scripts/unnerf-status.mjs" changes "$PREV_CATALOG" "$NEW_CATALOG" 2>&1 | sed 's/^/  /' || warn "un-nerf status check failed (non-fatal)"
fi

# --- 4. validate catalog ----------------------------------------------------
# ACK_REMOVED=<N>: after manually verifying that a large id-removal is genuine
# upstream deletion (see validate-catalog gate 6), re-run with ACK_REMOVED set to
# the exact removed count to let the pipeline proceed. Any other count still fails.
log "Validating catalog (structural gates)"
if [ -n "${ACK_REMOVED:-}" ]; then
  node "$REPO/scripts/validate-catalog.mjs" "$NEW_CATALOG" "${PREV_CATALOG:-}" --strict --ack-removed "$ACK_REMOVED"
else
  node "$REPO/scripts/validate-catalog.mjs" "$NEW_CATALOG" "${PREV_CATALOG:-}" --strict
fi
ok "catalog gates pass"

# NOTE: pruning the superseded catalogs used to happen here, right after the
# gates. It now runs in step 6b, once the patched binary has actually been
# built and booted — see the comment there for why.

# --- 5. reconstruct stock .md -----------------------------------------------
log "Reconstructing stock prompts"
node "$REPO/scripts/sync-version.mjs" "$CC_VERSION"

# --- 5b. bucket-analyze new un-nerf candidates (automated: AI proposes, this
# script mechanically validates and merges — see bucket-analyze.mjs's header
# for why this needs no human gate to take effect). Runs against the FRESH
# stock text just written above, so a candidate's flagged phrase is exactly
# what's on disk right now — a rule keyed to already-un-nerfed text would
# immediately show up as "already covered" (or, if genuinely different, get
# rejected by the overlap check) rather than silently duplicating.
if [ -f "$BUCKET_ANALYZE" ]; then
  log "Preparing un-nerf bucket-analysis worklist"
  BA_WORK="$WORK/bucket-analysis"
  M=$(node "$BUCKET_ANALYZE" prepare "$CC_VERSION" "$BA_WORK" | grep -oE 'worklist: [0-9]+' | grep -oE '[0-9]+' || echo 0)

  if [ "${M:-0}" -gt 0 ]; then
    log "Bucket-analyzing $M new un-nerf candidate(s) via $LLM_PROVIDER in $(ls "$BA_WORK"/chunk-*.json | wc -l) chunk(s)"
    for attempt in 1 2 3; do
      for chunk in "$BA_WORK"/chunk-*.json; do
        cn=$(basename "$chunk" .json); cn=${cn#chunk-}
        [ -f "$BA_WORK/verdicts-$cn.json" ] && continue   # already analyzed (earlier attempt)
        log "  analyzing chunk $cn (attempt $attempt)"
        if [ "$LLM_PROVIDER" = "gemini" ]; then
          node "$BUCKET_ANALYZE" label "$BA_WORK" "$cn" || true
        else
          ( cd "$BA_WORK" && "$CLAUDE_FOR_RELABEL" -p --dangerously-skip-permissions \
              --model "$RELABEL_MODEL" \
              "Read BUCKET-ANALYSIS-TASK.md in this directory and follow it EXACTLY. Your assigned chunk file is chunk-$cn.json and you MUST write your verdicts to verdicts-$cn.json in this directory (a JSON array with exactly one object per item in chunk-$cn.json, echoing each ref verbatim — refs are global indices, they do not start at 0). The un-nerf guide is $REPO/UNNERF-GUIDE.md ; read its Part 1 in full before deciding anything. Do not ask questions; complete the task and write the file." ) || true
        fi
      done
      if node "$BUCKET_ANALYZE" collect "$BA_WORK"; then break; fi
      [ "$attempt" = 3 ] && die "bucket-analysis incomplete after 3 attempts (see $BA_WORK)"
      log "  re-running short chunks"
      # Drop any verdicts file that is short/malformed so the loop retries it.
      for chunk in "$BA_WORK"/chunk-*.json; do
        cn=$(basename "$chunk" .json); cn=${cn#chunk-}
        node -e '
          const fs=require("fs");
          const [c,l]=process.argv.slice(1);
          if(!fs.existsSync(l)) process.exit(0);
          try{
            const want=JSON.parse(fs.readFileSync(c,"utf8")).map(i=>i.ref).sort((a,b)=>a-b);
            const got=[...new Set(JSON.parse(fs.readFileSync(l,"utf8")).map(o=>o.ref))].sort((a,b)=>a-b);
            if(JSON.stringify(want)!==JSON.stringify(got)) fs.unlinkSync(l);
          }catch{ fs.unlinkSync(l); }
        ' "$chunk" "$BA_WORK/verdicts-$cn.json"
      done
    done
    [ -f "$BA_WORK/verdicts.json" ] || die "bucket-analysis did not produce verdicts.json"
    log "Merging accepted un-nerf rules into apply-unnerfs.py"
    node "$BUCKET_ANALYZE" merge "$BA_WORK" "$REPO/scripts/apply-unnerfs.py" "$CC_VERSION" \
      || die "bucket-analysis merge failed — see output above"
    ok "bucket-analysis complete — full keep/lift review: data/bucket-analysis-$CC_VERSION.json"
  else
    ok "no new un-nerf candidates to bucket-analyze"
  fi
else
  warn "scripts/bucket-analyze.mjs missing — skipping automated bucket-analysis (fall back to the manual UNNERF-GUIDE Part 1 pass)"
fi

# --- 5c. replay un-nerfs (existing + any bucket-analyze just added) --------
log "Replaying un-nerfs"
python3 "$REPO/scripts/apply-unnerfs.py"
python3 "$REPO/scripts/apply-unnerfs.py" --check || die "apply-unnerfs --check not clean after sync"
ok "un-nerfs applied + idempotent"

# --- 6. verify the un-nerfs actually patch the binary ----------------------
if [ "$PATCH_VERIFY" -eq 1 ] && [ -f "$PATCH_CLI" ]; then
  log "Verifying un-nerfs patch the binary (vendored patcher + repack + boot-check)"
  PATCHED_JS="$WORK/patched-js"; PATCHED_BIN="$WORK/claude-patched.exe"
  # Release gate: exit 3 means a real un-nerf failed to splice (see [LOST] banner)
  # — block the release so the drifted anchor gets fixed. exit 2 = invalid output.
  set +e; SPLICE_OUT="$(node "$PATCH_CLI" apply "$CLI_JS" "$NEW_CATALOG" "$SYS_PROMPTS" "$PATCHED_JS" 2>&1)"; SRC=$?; set -e
  echo "$SPLICE_OUT" | sed 's/^/  /'
  [ "$SRC" -eq 0 ] || die "prompt splice reported failures (exit $SRC) — fix before releasing (see output above)"

  # --- effort un-nerfs (BEST-EFFORT) + posture drift detection --------------
  # Lift CC's silent effort caps on the prompt-patched bundle. A failure here
  # never blocks the prompt un-nerfs. The stock effort "posture" is snapshotted
  # and diffed against the committed manifest, so a change in CC's effort surface
  # (renamed field, restructured enum) surfaces as a LOUD worklist, not a silent
  # regression — same idea as the prompt-checksum manifest.
  POSTURE="$REPO/data/effort-posture.json"; POSTURE_NEW="$WORK/effort-posture.json"
  node "$REPO/engine/apply-code-patches.mjs" posture "$CLI_JS" > "$POSTURE_NEW" 2>/dev/null || true
  EFF_JS="$WORK/patched-effort-js"
  # 3 dirs, not 2: apply-code-patches.mjs runs downstream of patch-prompts.mjs's
  # SPARSE output (only the modules it changed), so it needs the pristine
  # unpack ($CLI_JS) to search across every module for the effort-config code,
  # plus that sparse output ($PATCHED_JS) to know what's already changed. See
  # apply-code-patches.mjs's header comment for the full reasoning.
  set +e; EFF_OUT="$(node "$REPO/engine/apply-code-patches.mjs" apply "$CLI_JS" "$PATCHED_JS" "$EFF_JS" 2>&1)"; set -e
  echo "$EFF_OUT" | sed 's/^/  /'
  [ -d "$EFF_JS" ] && PATCHED_JS="$EFF_JS"
  echo "$EFF_OUT" | grep -q 'SOME MISSING' && \
    warn "effort un-nerf incomplete — CC's effort code likely changed; update engine/apply-code-patches.mjs anchors. Prompt un-nerfs are unaffected."
  if [ -f "$POSTURE" ] && [ -s "$POSTURE_NEW" ] && ! diff -q "$POSTURE" "$POSTURE_NEW" >/dev/null 2>&1; then
    warn "CC effort surface changed since last release — review the diff:"
    diff "$POSTURE" "$POSTURE_NEW" 2>/dev/null | sed 's/^/    /' || true
  fi
  [ -s "$POSTURE_NEW" ] && cp "$POSTURE_NEW" "$POSTURE"

  set +e
  REPACK_OUT="$(node "$NATIVE_CLI" repack "$CC_BIN" "$PATCHED_JS" "$PATCHED_BIN" 2>&1)"; RC=$?
  set -e
  echo "$REPACK_OUT" | grep -q "BUN_FORMAT_INCOMPATIBLE" && bun_incompatible "$REPACK_OUT"
  [ $RC -eq 0 ] || die "repack failed: $REPACK_OUT"
  if "$PATCHED_BIN" --version >/dev/null 2>&1; then ok "patched binary boots"; else die "patched binary failed boot-check"; fi
  # sentinel spot-check
  MISS=0
  for s in "senior-engineer standard" "never trade away rigor, depth, or correctness" "thorough, clear, and rich with explanation"; do
    grep -rqF "$s" "$PATCHED_JS" || { warn "sentinel missing from patched JS: $s"; MISS=$((MISS+1)); }
  done
  [ $MISS -eq 0 ] && ok "un-nerf sentinels present in patched binary"
else
  warn "skipping patch-verify (${PATCH_CLI##*/} not built or --no-patch-verify)"
fi

# --- 6b. finalize: prune superseded catalogs, clear the mid-build marker ----
# We only ever need the newest prompts-*.json: it is BOTH what ships AND the
# carry-forward seed for the next upgrade (PREV_CATALOG = newest complete one).
#
# This deliberately runs LAST, not right after the step-4 gates. The previous
# catalog is the only seed a re-run has, so deleting it before the pipeline can
# actually finish is unrecoverable-by-script: a failure in steps 5–6 (a repack
# that can't parse the binary, say) would leave the repo with a half-built
# catalog and NO seed, and the next run dies in gen-catalog with a bare usage
# error. Nothing between step 4 and here reads PREV_CATALOG, so there is no
# reason to prune early. Recovery from a failed run is then just "run it again":
# the previous catalog is still on disk, and the classification store
# (data/string-catalog.json, keyed by SHA-256 and written after every job) means
# the model work already paid for is reused rather than re-billed.
#
# The `.candidates.json` sidecar matches this same glob, so it needs the same
# exemption the version-resolution glob above already gives it. Without it this
# loop deletes the review artifact gen-catalog wrote (and pointed at) earlier,
# so `prompts-$CC_VERSION.candidates.json` never survives to be committed while
# the previous release's tracked copy still shows as deleted.
PRUNED=0
NEW_CANDIDATES="${NEW_CATALOG%.json}.candidates.json"
for old in "$PROMPTS_DIR"/prompts-*.json; do
  [ -e "$old" ] || continue
  [ "$old" = "$NEW_CATALOG" ] && continue
  [ "$old" = "$NEW_CANDIDATES" ] && continue
  rm -f "$old" "$old.incomplete" && PRUNED=$((PRUNED+1))
done
[ "$PRUNED" -gt 0 ] && ok "pruned $PRUNED superseded catalog(s) — only prompts-$CC_VERSION.json remains (git will show them deleted)"
rm -f "$NEW_CATALOG.incomplete"

# --- 7. OPTIONAL benchmark (--benchmark) -----------------------------------
# Stock vs patched accuracy on SWE-bench. OPT-IN and HEAVY (Docker + hours);
# best-effort — a benchmark failure never fails the upgrade. Runs on the binaries
# built above (both live in $WORK until this script exits); benchmark.mjs copies
# them to a stable path first.
if [ "$BENCHMARK" -eq 1 ]; then
  if [ "$PATCH_VERIFY" -eq 1 ] && [ -n "${PATCHED_BIN:-}" ] && [ -f "$PATCHED_BIN" ]; then
    log "Benchmarking stock vs patched v$CC_VERSION (SWE-bench, n=$BENCH_N) — this is slow"
    node "$REPO/scripts/benchmark.mjs" "$CC_BIN" "$PATCHED_BIN" "$CC_VERSION" "$BENCH_N" \
      || warn "benchmark step did not complete — the upgrade itself is unaffected (see data/benchmark/*.log)"
  else
    warn "--benchmark needs the patched binary from patch-verify — don't combine it with --no-patch-verify."
  fi
else
  log "Benchmark skipped. To compare stock vs patched accuracy: ./upgrade.sh --benchmark[=N]  (heavy: Docker + hours)"
fi

# --- done -------------------------------------------------------------------
log "Upgrade prepared for v$CC_VERSION"
cat <<EOF

  Review, then commit:
    - data/prompts/prompts-$CC_VERSION.json   (new catalog — WE own this now)
    - data/prompts/prompts-*.json (deleted)   (superseded catalogs — 'git add' the deletions)
    - system-prompts/*.md                     (reconstructed + un-nerfed)
    - system-prompt-checksums.json            (regenerated by sync-version)
    - scripts/apply-unnerfs.py                (bucket-analysis may have added new rules)
    - data/bucket-analysis-$CC_VERSION.json   (full keep/lift review, incl. every KEEP + why)
    - scripts/*, engine/*                        (if changed)

  Bucket-analysis (deciding which new/changed prompts need a new un-nerf rule,
  and drafting it) already ran automatically above — see
  data/bucket-analysis-$CC_VERSION.json for the full review before committing.
  apply-unnerfs.py --check already gates this step, so anything in
  scripts/apply-unnerfs.py has already passed; this file is for AUDIT, not
  redoing the analysis. If bucket-analyze.mjs was skipped or rejected a
  candidate you disagree with, that's the one case left for a manual
  UNNERF-GUIDE Part 1 pass.
EOF
