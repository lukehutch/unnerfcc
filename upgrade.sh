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
# (lib/bun-binary.mjs), un-minify (lib/beautify.mjs), extract the catalog
# (lib/extract-prompts.mjs), and patch (lib/patch-prompts.mjs) are all OUR OWN
# code. The only external "AI" call is `claude` itself for relabeling.
#
# BUN FORMAT: if lib/bun-binary.mjs reports the binary's Bun container format is
# one it doesn't understand, this script STOPS — update lib/bun-binary.mjs for
# the new layout.
#
# USAGE
#   ./upgrade.sh [--version X.Y.Z] [--force] [--no-patch-verify] [--benchmark[=N]] [--yes]
#
# --benchmark[=N]: after a clean upgrade, run the SWE-bench harness on the STOCK
#   and just-PATCHED binaries and update the accuracy bar chart in README.md
#   (default N=10). OPT-IN and HEAVY: needs Docker + ~50GB disk + hours; it is
#   best-effort and never fails the upgrade. See scripts/benchmark.mjs.
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

NATIVE_CLI="$REPO/lib/bun-binary.mjs"
PATCH_CLI="$REPO/lib/patch-prompts.mjs"
LIB_DIR="$REPO/lib"
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
  printf   '║  BUN FORMAT INCOMPATIBLE — lib/bun-binary.mjs could not parse ║\n'
  printf   '║  this Claude Code binary. Bun likely changed its standalone   ║\n'
  printf   '║  container format. Update the format constants/logic in       ║\n'
  printf   '║  lib/bun-binary.mjs for the new layout (its header documents  ║\n'
  printf   '║  the format; a current tweakcc-fixed is a useful reference).  ║\n'
  printf   '╚══════════════════════════════════════════════════════════════╝\033[0m\n' >&2
  printf 'detail: %s\n' "$1" >&2
  exit 3
}

# --- preconditions ----------------------------------------------------------
command -v node >/dev/null || die "node not found"
command -v python3 >/dev/null || die "python3 not found"
# NOTE: `claude` is NOT required to be installed — we fetch the target binary
# ourselves (see below). It's only used, if present, for the semantic relabel
# step; otherwise the freshly-fetched binary stands in.
[ -f "$NATIVE_CLI" ] || die "lib/bun-binary.mjs missing — is the repo intact?"
if [ ! -d "$LIB_DIR/node_modules/node-lief" ]; then
  log "Installing lib/ dependencies (first run: node-lief, @babel/parser, prettier)"
  ( cd "$LIB_DIR" && npm install )
fi

# --- resolve the TARGET version (works whether or not CC is installed) ------
# upgrade.sh's job is to ADD un-nerf support for the newest Claude Code, so the
# target is the newest AVAILABLE release (npm) — not whatever happens to be
# installed — unless --version pins one. We fetch that exact version's binary
# ourselves below, so nothing needs to be installed first.
log "Resolving target Claude Code version"
mkdir -p "$PROMPTS_DIR"

# Newest version we already ship a catalog for (also the id carry-forward seed).
PREV_CATALOG="$(ls "$PROMPTS_DIR"/prompts-*.json 2>/dev/null | sort -V | tail -1 || true)"
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
                           || warn "no existing catalog in $PROMPTS_DIR — first run (no id carry-forward)."
[ -n "$NPM_LATEST" ] && ok "newest on npm: v$NPM_LATEST"
[ -n "$INSTALLED_VERSION" ] && ok "installed: v$INSTALLED_VERSION"
ok "target version: v$CC_VERSION"

# Nothing-to-do: we already have a catalog for the target and no --force.
if [ -f "$PROMPTS_DIR/prompts-$CC_VERSION.json" ] && [ "$FORCE" -eq 0 ]; then
  ok "already support v$CC_VERSION — nothing to do (use --force to regenerate, or --version to target another release)."
  exit 0
fi
if [ -n "$SUPPORTED_LATEST" ] && [ "$CC_VERSION" != "$SUPPORTED_LATEST" ]; then
  newer() { [ "$1" != "$2" ] && [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | tail -1)" = "$1" ]; }
  newer "$CC_VERSION" "$SUPPORTED_LATEST" \
    && log "adding support for v$CC_VERSION (newer than our latest v$SUPPORTED_LATEST)" \
    || warn "target v$CC_VERSION is OLDER than our latest catalog v$SUPPORTED_LATEST — regenerating it anyway"
fi

NEW_CATALOG="$PROMPTS_DIR/prompts-$CC_VERSION.json"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/unnerfcc-upgrade-$CC_VERSION-XXXX")"
CLI_JS="$WORK/cli.js"
trap 'rm -rf "$WORK"' EXIT

# --- obtain the target native binary ---------------------------------------
# Reuse an already-installed binary at the target version; otherwise fetch that
# EXACT version into a temp prefix under $WORK — the maintainer's global install
# is never touched (install.cjs's postinstall materializes bin/claude.exe from
# the platform-matching optional dep).
log "Resolving the v$CC_VERSION native binary"
CC_BIN=""
if [ "$INSTALLED_VERSION" = "$CC_VERSION" ] && command -v claude >/dev/null 2>&1; then
  LAUNCHER="$(command -v claude)"
  CC_BIN="$(readlink -f "$LAUNCHER" 2>/dev/null || echo "$LAUNCHER")"
  [ -f "$CC_BIN" ] && ok "using installed binary: $CC_BIN (v$CC_VERSION)" || CC_BIN=""
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

# --- 1. unpack the binary (Bun-format-change aware) ------------------------
log "Unpacking JS bundle from the native binary"
set +e
UNPACK_OUT="$(node "$NATIVE_CLI" unpack "$CC_BIN" "$CLI_JS" 2>&1)"; RC=$?
set -e
echo "$UNPACK_OUT" | grep -q "BUN_FORMAT_INCOMPATIBLE" && bun_incompatible "$UNPACK_OUT"
[ $RC -eq 3 ] && bun_incompatible "$UNPACK_OUT"
[ $RC -eq 0 ] || die "unpack failed (rc=$RC): $UNPACK_OUT"
echo "$UNPACK_OUT" | grep -qE "version=$CC_VERSION" || warn "unpacked JS version tag != $CC_VERSION (continuing)"
ok "unpacked $(wc -c < "$CLI_JS" | awk '{printf "%.1fMB", $1/1048576}') of JS"

# --- 1b. classify new strings via Claude (prompt/non-prompt + un-nerf) ------
# SHA-256-fingerprint every string; only strings NEW to this build (or prompts
# judged under an older un-nerf policy version) are sent to Claude. The store
# (data/string-catalog.json) persists, so this is cheap on a normal upgrade and
# only large on the one-time bootstrap.
log "Classifying new strings via Claude (cached by SHA-256)"
PENDING="$(node "$REPO/scripts/classify.mjs" "$CLI_JS" "$CC_VERSION" --dry-run 2>/dev/null | grep -oE '"toClassify":[0-9]+' | grep -oE '[0-9]+' || echo '?')"
if [ "$PENDING" = "0" ]; then
  ok "no new strings — classification store is current"
elif [ "$PENDING" -gt 2000 ] && [ "$ASSUME_YES" -eq 0 ]; then
  warn "$PENDING strings need classifying (a first-run bootstrap — a large Claude job)."
  printf '  Run it now? [y/N] '; read -r a
  case "$a" in [yY]*) node "$REPO/scripts/classify.mjs" "$CLI_JS" "$CC_VERSION" 2>&1 | sed 's/^/  /' || warn "classification incomplete (store is resumable)";;
    *) warn "skipped — run 'node scripts/classify.mjs $CLI_JS $CC_VERSION' later";; esac
else
  node "$REPO/scripts/classify.mjs" "$CLI_JS" "$CC_VERSION" 2>&1 | sed 's/^/  /' || warn "classification incomplete (store is resumable)"
  [ -f "$REPO/data/unnerf-candidates.json" ] && ok "un-nerf candidates for review: data/unnerf-candidates.json"
fi

# --- 2. extract a fresh catalog (seeded) -----------------------------------
log "Extracting prompt catalog (seeded from previous for id carry-forward)"
node "$REPO/scripts/gen-catalog.mjs" "$CLI_JS" "$CC_VERSION" "$NEW_CATALOG" "${PREV_CATALOG:-}"
ok "catalog: $NEW_CATALOG"

# --- 3. diff + relabel worklist --------------------------------------------
if [ -n "${PREV_CATALOG:-}" ]; then
  log "SHA-256 diff vs previous catalog"
  node "$REPO/scripts/prompt-index.mjs" diff "$PREV_CATALOG" "$NEW_CATALOG" | sed 's/^/  /'

  # Did any reworded prompt gain/lose a brevity/effort nerf? Pairs prev vs new
  # catalog by id and compares each changed prompt's classified un-nerf status.
  log "Checking un-nerf status changes on reworded prompts"
  node "$REPO/scripts/unnerf-status.mjs" changes "$PREV_CATALOG" "$NEW_CATALOG" 2>&1 | sed 's/^/  /' || warn "un-nerf status check failed (non-fatal)"

  log "Preparing relabel worklist"
  RL_WORK="$WORK/relabel"
  N=$(node "$REPO/scripts/relabel.mjs" prepare "$PREV_CATALOG" "$NEW_CATALOG" "$RL_WORK" | grep -oE 'worklist: [0-9]+' | grep -oE '[0-9]+' || echo 0)

  if [ "${N:-0}" -gt 0 ]; then
    log "Launching Claude Code to label $N new/changed fragment(s)"
    ( cd "$RL_WORK" && "$CLAUDE_FOR_RELABEL" -p --dangerously-skip-permissions \
        "Read LABELING-TASK.md in this directory and follow it EXACTLY. The un-nerf guide is $REPO/UNNERF-GUIDE.md ; the previous catalog is $PREV_CATALOG . Read worklist.json ($N items), assign a label to each per the conventions, and WRITE the result as labels.json in this directory (a JSON array of $N objects, one per ref). Do not ask questions; complete the task and write the file." )
    [ -f "$RL_WORK/labels.json" ] || die "claude did not produce labels.json"
    log "Merging labels into the catalog"
    node "$REPO/scripts/relabel.mjs" merge "$NEW_CATALOG" "$RL_WORK/labels.json" "$NEW_CATALOG"
    ok "relabeled + merged $N fragment(s)"
  else
    ok "no fragments need relabeling (extractor identified everything)"
  fi
fi

# --- 4. validate catalog ----------------------------------------------------
log "Validating catalog (structural gates)"
node "$REPO/scripts/validate-catalog.mjs" "$NEW_CATALOG" "${PREV_CATALOG:-}" --strict
ok "catalog gates pass"

# --- 4b. prune superseded catalogs (ship only the latest) ------------------
# We only ever need the newest prompts-*.json: it is BOTH what ships AND the
# carry-forward seed for the next upgrade (PREV_CATALOG = highest present).
# Now that the new catalog has passed its gates and nothing downstream reads
# the previous one, drop every other per-version catalog so the repo only ever
# ships data for the latest synced CC version.
PRUNED=0
for old in "$PROMPTS_DIR"/prompts-*.json; do
  [ -e "$old" ] || continue
  [ "$old" = "$NEW_CATALOG" ] && continue
  rm -f "$old" && PRUNED=$((PRUNED+1))
done
[ "$PRUNED" -gt 0 ] && ok "pruned $PRUNED superseded catalog(s) — only prompts-$CC_VERSION.json remains (git will show them deleted)"

# --- 5. reconstruct stock .md + replay un-nerfs ----------------------------
log "Reconstructing stock prompts + replaying un-nerfs"
node "$REPO/scripts/sync-version.mjs" "$CC_VERSION"
python3 "$REPO/scripts/apply-unnerfs.py"
python3 "$REPO/scripts/apply-unnerfs.py" --check || die "apply-unnerfs --check not clean after sync"
ok "un-nerfs applied + idempotent"

# --- 6. verify the un-nerfs actually patch the binary ----------------------
if [ "$PATCH_VERIFY" -eq 1 ] && [ -f "$PATCH_CLI" ]; then
  log "Verifying un-nerfs patch the binary (vendored patcher + repack + boot-check)"
  PATCHED_JS="$WORK/patched.js"; PATCHED_BIN="$WORK/claude-patched.exe"
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
  node "$REPO/lib/apply-code-patches.mjs" posture "$CLI_JS" > "$POSTURE_NEW" 2>/dev/null || true
  EFF_JS="$WORK/patched.effort.js"
  set +e; EFF_OUT="$(node "$REPO/lib/apply-code-patches.mjs" apply "$PATCHED_JS" "$EFF_JS" 2>&1)"; set -e
  echo "$EFF_OUT" | sed 's/^/  /'
  [ -s "$EFF_JS" ] && PATCHED_JS="$EFF_JS"
  echo "$EFF_OUT" | grep -q 'SOME MISSING' && \
    warn "effort un-nerf incomplete — CC's effort code likely changed; update lib/apply-code-patches.mjs anchors. Prompt un-nerfs are unaffected."
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
    grep -qF "$s" "$PATCHED_JS" || { warn "sentinel missing from patched JS: $s"; MISS=$((MISS+1)); }
  done
  [ $MISS -eq 0 ] && ok "un-nerf sentinels present in patched binary"
else
  warn "skipping patch-verify (${PATCH_CLI##*/} not built or --no-patch-verify)"
fi

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
    - scripts/*, lib/*                        (if changed)

  Bucket-analyze any new/changed prompts per UNNERF-GUIDE Part 1, add un-nerf
  rules to scripts/apply-unnerfs.py where warranted, then re-run
  'python3 scripts/apply-unnerfs.py --check' before committing.
EOF
