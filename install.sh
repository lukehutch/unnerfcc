#!/usr/bin/env bash
#
# install.sh — patch your Claude Code binary with the un-nerfed prompts.
#              STANDALONE: uses unnerfcc's OWN toolkit in lib/ (bun-binary,
#              patch-prompts) — no dependency on the tweakcc-fixed project.
#
# WHAT IT DOES
#   1. Finds your Claude Code native binary and its version.
#   2. Ensures a prompt catalog for that version exists (data/prompts/); if not,
#      tells you to run ./upgrade.sh first (which generates it).
#   3. Rebuilds that version's STOCK prompts from the catalog and replays the
#      un-nerfs (sync-version.mjs + apply-unnerfs.py) into system-prompts/.
#   4. Backs up the binary, unpacks its JS bundle, splices the un-nerfed prompts
#      in (vendored patcher), repacks, and BOOT-CHECKS the result — restoring the
#      backup if the patched binary won't start.
#   5. Verifies the un-nerf sentinels actually landed, and disables CC's
#      auto-updater so the patch isn't silently reverted on next launch.
#
# If Bun changed the binary format, lib/bun-binary.mjs reports it and this
# script STOPS — update lib/bun-binary.mjs for the new layout.
#
# USAGE
#   ./install.sh [--dry-run] [--version X.Y.Z] [--help]
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

NATIVE_CLI="$REPO/lib/bun-binary.mjs"
PATCH_CLI="$REPO/lib/patch-prompts.mjs"
LIB_DIR="$REPO/lib"
PROMPTS_DIR="$REPO/data/prompts"
SYS_PROMPTS="$REPO/system-prompts"

DRY_RUN=0; WANT_VERSION=""
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift;;
    --version) WANT_VERSION="$2"; shift 2;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0;;
    *) echo "unknown arg: $1" >&2; exit 2;;
  esac
done

B=$'\033[1m'; G=$'\033[36m'; Y=$'\033[33m'; R=$'\033[31m'; N=$'\033[0m'
log()  { printf '%s==>%s %s\n' "$B$G" "$N" "$*"; }
info() { printf '    %s\n' "$*"; }
ok()   { printf '%s  ✓%s %s\n' "$B$G" "$N" "$*"; }
warn() { printf '%s!! %s%s\n' "$Y" "$*" "$N" >&2; }
die()  { printf '%sERROR:%s %s\n' "$R$B" "$N" "$*" >&2; exit 1; }
run()  { if [ "$DRY_RUN" = 1 ]; then printf '%s[dry-run]%s %s\n' "$B" "$N" "$*"; else eval "$@"; fi; }
bun_incompatible() {
  printf '%s\nBUN FORMAT INCOMPATIBLE — lib/bun-binary.mjs could not parse this\n' "$R$B" >&2
  printf 'Claude Code binary. Bun likely changed its standalone container format.\n' >&2
  printf 'Update the format logic in lib/bun-binary.mjs for the new layout.%s\n' "$N" >&2
  printf 'detail: %s\n' "$1" >&2
  exit 3
}

# --- preconditions ----------------------------------------------------------
command -v node    >/dev/null || die "node not found"
command -v python3 >/dev/null || die "python3 not found"
command -v claude  >/dev/null || die "the 'claude' CLI is not on PATH"

# Install lib/ deps on first run (node-lief native addon, babel, prettier).
[ -f "$NATIVE_CLI" ] || die "lib/bun-binary.mjs missing — is the repo intact?"
[ -f "$PATCH_CLI" ]  || die "lib/patch-prompts.mjs missing — is the repo intact?"
if [ ! -d "$LIB_DIR/node_modules/node-lief" ]; then
  log "Installing lib/ dependencies (first run: node-lief, @babel/parser, prettier)"
  run "( cd '$LIB_DIR' && npm install )"
fi

# --- resolve binary + version ----------------------------------------------
log "Resolving Claude Code binary"
LAUNCHER="$(command -v claude)"
CC_BIN="$(readlink -f "$LAUNCHER" 2>/dev/null || echo "$LAUNCHER")"
[ -f "$CC_BIN" ] || die "could not resolve the claude binary from $LAUNCHER"
CC_VERSION="${WANT_VERSION:-$(claude --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)}"
[ -n "$CC_VERSION" ] || die "could not determine installed CC version"
ok "binary: $CC_BIN (v$CC_VERSION)"

CATALOG="$PROMPTS_DIR/prompts-$CC_VERSION.json"
if [ ! -f "$CATALOG" ]; then
  die "no prompt catalog for v$CC_VERSION at $CATALOG.
    Run  ./upgrade.sh  first — it generates the catalog for the installed CC
    version (and relabels any new prompts). Then re-run install.sh."
fi
ok "catalog: $CATALOG"

# --- rebuild stock + replay un-nerfs ---------------------------------------
log "Rebuilding stock prompts + replaying un-nerfs"
run "node '$REPO/scripts/sync-version.mjs' '$CC_VERSION'"
run "python3 '$REPO/scripts/apply-unnerfs.py'"
run "python3 '$REPO/scripts/apply-unnerfs.py' --check" || die "apply-unnerfs --check not clean"
ok "un-nerfed .md set ready in system-prompts/"

if [ "$DRY_RUN" = 1 ]; then log "[dry-run] would back up, unpack, patch, repack, boot-check, verify, install"; exit 0; fi

# --- backup -----------------------------------------------------------------
WORK="$(mktemp -d "${TMPDIR:-/tmp}/unnerfcc-install-XXXX")"; trap 'rm -rf "$WORK"' EXIT
BACKUP="$WORK/claude.orig"
log "Backing up the binary"
cp "$CC_BIN" "$BACKUP"; ok "backup: $BACKUP ($(wc -c < "$BACKUP" | awk '{printf "%.0fMB", $1/1048576}'))"

# --- unpack -> patch -> repack ---------------------------------------------
CLI_JS="$WORK/cli.js"; PATCHED_JS="$WORK/patched.js"; PATCHED_BIN="$WORK/claude.patched"
log "Unpacking JS bundle"
set +e; OUT="$(node "$NATIVE_CLI" unpack "$CC_BIN" "$CLI_JS" 2>&1)"; RC=$?; set -e
echo "$OUT" | grep -q BUN_FORMAT_INCOMPATIBLE && bun_incompatible "$OUT"; [ $RC -eq 3 ] && bun_incompatible "$OUT"
[ $RC -eq 0 ] || die "unpack failed: $OUT"
ok "unpacked $(wc -c < "$CLI_JS" | awk '{printf "%.1fMB", $1/1048576}')"

log "Splicing un-nerfed prompts into the bundle"
node "$PATCH_CLI" apply "$CLI_JS" "$CATALOG" "$SYS_PROMPTS" "$PATCHED_JS" | sed 's/^/    /'

# --- effort un-nerfs (BEST-EFFORT; must never block the prompt patches) -----
# Lift CC's silent effort caps (mid-tier model default, /effort capped below the
# ceiling). Runs on the already-prompt-patched bundle; if an anchor drifted, it
# reports and we ship the prompt un-nerfs alone. See lib/apply-code-patches.mjs.
EFF_JS="$WORK/patched.effort.js"
log "Applying effort un-nerfs (best-effort)"
set +e; EFF_OUT="$(node "$REPO/lib/apply-code-patches.mjs" apply "$PATCHED_JS" "$EFF_JS" 2>&1)"; set -e
echo "$EFF_OUT" | sed 's/^/    /'
if [ -s "$EFF_JS" ]; then
  PATCHED_JS="$EFF_JS"   # ship prompt + effort un-nerfs
  echo "$EFF_OUT" | grep -q 'SOME MISSING' && \
    warn "effort un-nerf incomplete — CC's effort code likely changed; prompt un-nerfs are unaffected"
else
  warn "effort un-nerf pass produced no output — shipping prompt un-nerfs only (binary unaffected)"
fi

log "Repacking + boot-check"
set +e; OUT="$(node "$NATIVE_CLI" repack "$CC_BIN" "$PATCHED_JS" "$PATCHED_BIN" 2>&1)"; RC=$?; set -e
echo "$OUT" | grep -q BUN_FORMAT_INCOMPATIBLE && bun_incompatible "$OUT"
[ $RC -eq 0 ] || die "repack failed: $OUT"
if ! "$PATCHED_BIN" --version >/dev/null 2>&1; then
  die "patched binary failed boot-check — NOT installing; your binary is untouched"
fi
ok "patched binary boots"

# --- sentinel verify (against the patched artifact, before install) --------
MISS=0
for s in "senior-engineer standard" "never trade away rigor, depth, or correctness" \
         "Spawn agents whenever parallel investigation" "investigate thoroughly, then be direct" \
         "thorough, clear, and rich with explanation"; do
  grep -qF "$s" "$PATCHED_JS" || { warn "sentinel missing: $s"; MISS=$((MISS+1)); }
done
[ $MISS -eq 0 ] && ok "all 5 un-nerf sentinels present" || \
  warn "$MISS sentinel(s) missing — patch may be partial for v$CC_VERSION (continuing; the binary boots)"

# --- install (atomic, new inode) -------------------------------------------
log "Installing patched binary"
MODE="$(stat -c '%a' "$CC_BIN" 2>/dev/null || echo 755)"
cp "$PATCHED_BIN" "$CC_BIN.unnerf.tmp"
chmod "$MODE" "$CC_BIN.unnerf.tmp"
mv -f "$CC_BIN.unnerf.tmp" "$CC_BIN"   # rename → new inode (macOS: stale-vnode signature would SIGKILL)
ok "installed → $CC_BIN"

# --- disable CC auto-updater so the patch survives -------------------------
log "Disabling Claude Code auto-updater (so the patch isn't reverted on next launch)"
SETTINGS="${HOME}/.claude/settings.json"; mkdir -p "${HOME}/.claude"
set +e
node -e '
  const fs=require("fs"),p=process.argv[1];let raw=null;
  try{raw=fs.readFileSync(p,"utf8")}catch(e){if(e.code!=="ENOENT")process.exit(3)}
  let j={};if(raw&&raw.trim()){try{j=JSON.parse(raw)}catch(e){process.exit(3)}}
  if(typeof j!=="object"||!j||Array.isArray(j))process.exit(3);
  if(j.env&&j.env.DISABLE_AUTOUPDATER==="1")process.exit(2);
  j.env=j.env||{};j.env.DISABLE_AUTOUPDATER="1";
  fs.writeFileSync(p,JSON.stringify(j,null,2)+"\n");
' "$SETTINGS"; RC=$?
set -e
case "$RC" in
  0) ok "DISABLE_AUTOUPDATER=1 set in $SETTINGS";;
  2) ok "auto-updater already disabled";;
  *) warn "could not update $SETTINGS — set env.DISABLE_AUTOUPDATER=1 yourself, or CC will auto-update and revert the patch";;
esac

log "Done — restart any running Claude Code sessions."
info "Rollback: reinstall Claude Code (npm install -g @anthropic-ai/claude-code@$CC_VERSION). No backup is kept after install."
