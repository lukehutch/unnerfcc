#!/usr/bin/env bash
#
# upgrade.sh — bring unnerfcc up to a new Claude Code release, fully standalone.
#
# This is the MAINTAINER flow (install.sh is the end-user apply flow). It:
#   1. detects the installed CC version and finds our latest catalog,
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
# It does NOT depend on the tweakcc-fixed project: the extractor, native binary
# I/O, and patcher are all vendored under vendor/tweakcc/ (see that dir's
# UPSTREAM.md). The only external "AI" call is `claude` itself for relabeling.
#
# BUN FORMAT: if the vendored native I/O reports the binary's Bun container
# format is one it doesn't understand, this script STOPS and tells you to
# re-vendor vendor/tweakcc/native/ from a current tweakcc-fixed (see UPSTREAM.md).
#
# USAGE
#   ./upgrade.sh [--version X.Y.Z] [--force] [--no-patch-verify] [--yes]
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

NATIVE_CLI="$REPO/vendor/tweakcc/native/dist/cli.mjs"
PATCH_CLI="$REPO/vendor/tweakcc/patch/dist/cli.mjs"
PROMPTS_DIR="$REPO/data/prompts"
SYS_PROMPTS="$REPO/system-prompts"

FORCE=0; PATCH_VERIFY=1; ASSUME_YES=0; WANT_VERSION=""
while [ $# -gt 0 ]; do
  case "$1" in
    --version) WANT_VERSION="$2"; shift 2;;
    --force) FORCE=1; shift;;
    --no-patch-verify) PATCH_VERIFY=0; shift;;
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
  printf   '║  BUN FORMAT INCOMPATIBLE — the vendored native I/O could not  ║\n'
  printf   '║  parse this Claude Code binary. Bun likely changed its        ║\n'
  printf   '║  container format. Re-vendor vendor/tweakcc/native/ from a     ║\n'
  printf   '║  current tweakcc-fixed and rebuild (see that dir UPSTREAM.md). ║\n'
  printf   '╚══════════════════════════════════════════════════════════════╝\033[0m\n' >&2
  printf 'detail: %s\n' "$1" >&2
  exit 3
}

# --- preconditions ----------------------------------------------------------
command -v node >/dev/null || die "node not found"
command -v python3 >/dev/null || die "python3 not found"
command -v claude  >/dev/null || die "the 'claude' CLI is required for relabeling"
if [ ! -f "$NATIVE_CLI" ] || { [ "$PATCH_VERIFY" -eq 1 ] && [ ! -f "$PATCH_CLI" ] && [ -d "$REPO/vendor/tweakcc/patch" ]; }; then
  log "Building vendored tweakcc modules (first run)"
  bash "$REPO/vendor/tweakcc/build.sh"
fi
[ -f "$NATIVE_CLI" ] || die "vendored native I/O still missing after build: $NATIVE_CLI"

# --- resolve the claude native binary --------------------------------------
log "Resolving Claude Code binary"
CLAUDE_LAUNCHER="$(command -v claude)"
CC_BIN="$(readlink -f "$CLAUDE_LAUNCHER" 2>/dev/null || echo "$CLAUDE_LAUNCHER")"
# The launcher usually symlinks to .../bin/claude.exe (native binary).
[ -f "$CC_BIN" ] || die "could not resolve the claude binary from $CLAUDE_LAUNCHER"
CC_VERSION="${WANT_VERSION:-$(claude --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)}"
[ -n "$CC_VERSION" ] || die "could not determine installed CC version"
ok "binary: $CC_BIN (v$CC_VERSION)"

# --- find our previous catalog ---------------------------------------------
mkdir -p "$PROMPTS_DIR"
PREV_CATALOG="$(ls "$PROMPTS_DIR"/prompts-*.json 2>/dev/null | sort -V | tail -1 || true)"
if [ -z "$PREV_CATALOG" ]; then
  warn "no previous catalog in $PROMPTS_DIR — this is a first run (no id carry-forward)."
else
  PREV_VERSION="$(basename "$PREV_CATALOG" | sed -E 's/prompts-(.*)\.json/\1/')"
  ok "previous catalog: v$PREV_VERSION"
  if [ "$CC_VERSION" = "$PREV_VERSION" ] && [ "$FORCE" -eq 0 ]; then
    ok "already at v$CC_VERSION — nothing to do (use --force to regenerate)."
    exit 0
  fi
fi

NEW_CATALOG="$PROMPTS_DIR/prompts-$CC_VERSION.json"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/unnerfcc-upgrade-$CC_VERSION-XXXX")"
CLI_JS="$WORK/cli.js"
trap 'rm -rf "$WORK"' EXIT

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

# --- 2. extract a fresh catalog (seeded) -----------------------------------
log "Extracting prompt catalog (seeded from previous for id carry-forward)"
node "$REPO/scripts/gen-catalog.mjs" "$CLI_JS" "$CC_VERSION" "$NEW_CATALOG" "${PREV_CATALOG:-}"
ok "catalog: $NEW_CATALOG"

# --- 3. diff + relabel worklist --------------------------------------------
if [ -n "${PREV_CATALOG:-}" ]; then
  log "SHA-256 diff vs previous catalog"
  node "$REPO/scripts/prompt-index.mjs" diff "$PREV_CATALOG" "$NEW_CATALOG" | sed 's/^/  /'

  log "Preparing relabel worklist"
  RL_WORK="$WORK/relabel"
  N=$(node "$REPO/scripts/relabel.mjs" prepare "$PREV_CATALOG" "$NEW_CATALOG" "$RL_WORK" | grep -oE 'worklist: [0-9]+' | grep -oE '[0-9]+' || echo 0)

  if [ "${N:-0}" -gt 0 ]; then
    log "Launching Claude Code to label $N new/changed fragment(s)"
    if [ "$ASSUME_YES" -eq 0 ]; then
      printf '  Launch \033[1mclaude\033[0m to semantically label %s fragment(s)? [Y/n] ' "$N"
      read -r ans; case "$ans" in [nN]*) die "aborted before relabel";; esac
    fi
    ( cd "$RL_WORK" && claude -p --dangerously-skip-permissions \
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
  node "$PATCH_CLI" apply "$CLI_JS" "$NEW_CATALOG" "$SYS_PROMPTS" "$PATCHED_JS" | sed 's/^/  /'
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

# --- done -------------------------------------------------------------------
log "Upgrade prepared for v$CC_VERSION"
cat <<EOF

  Review, then commit:
    - data/prompts/prompts-$CC_VERSION.json   (new catalog — WE own this now)
    - system-prompts/*.md                     (reconstructed + un-nerfed)
    - system-prompt-checksums.json            (regenerated by sync-version)
    - scripts/*, vendor/tweakcc/*             (if changed)

  Bucket-analyze any new/changed prompts per UNNERF-GUIDE Part 1, add un-nerf
  rules to scripts/apply-unnerfs.py where warranted, then re-run
  'python3 scripts/apply-unnerfs.py --check' before committing.
EOF
