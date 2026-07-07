#!/usr/bin/env bash
#
# install.sh — patch your Claude Code binary with the un-nerfed prompts.
#              STANDALONE: uses unnerfcc's OWN toolkit in lib/ (bun-binary,
#              patch-prompts) — no dependency on the tweakcc-fixed project.
#
# WHAT IT DOES
#   1. Picks the CC version to patch — the newest version we have a prompt catalog
#      for (data/prompts/), unless --version pins one. Works whether or not CC is
#      installed: it installs (or switches to) that version via npm as needed, and
#      an already-installed *supported* version is used as-is. If CC's latest npm
#      release is newer than any catalog we have, it says so (run ./upgrade.sh to
#      add support) and targets the newest version it CAN patch.
#   2. Rebuilds that version's STOCK prompts from the catalog and replays the
#      un-nerfs (sync-version.mjs + apply-unnerfs.py) into system-prompts/.
#   3. Unpacks the binary's JS bundle, splices the un-nerfed prompts in (vendored
#      patcher), applies the best-effort effort un-nerfs, repacks, and BOOT-CHECKS
#      the result. No backup is taken: the patched binary is swapped in only after
#      a clean boot-check, and any earlier failure leaves the installed binary
#      untouched. To roll back, reinstall Claude Code.
#   4. Verifies the un-nerf sentinels actually landed, and disables CC's
#      auto-updater so the patch isn't silently reverted on next launch.
#
# If Bun changed the binary format, lib/bun-binary.mjs reports it and this
# script STOPS — update lib/bun-binary.mjs for the new layout.
#
# USAGE
#   ./install.sh [--dry-run] [--version X.Y.Z] [--help]
#     --version X.Y.Z  pin an exact CC release (must have a catalog); default is
#                      the newest catalog we ship.
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

NATIVE_CLI="$REPO/lib/bun-binary.mjs"
PATCH_CLI="$REPO/lib/patch-prompts.mjs"
LIB_DIR="$REPO/lib"
SCRIPTS_DIR="$REPO/scripts"
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

# Install lib/ deps on first run (node-lief native addon, babel, prettier).
[ -f "$NATIVE_CLI" ] || die "lib/bun-binary.mjs missing — is the repo intact?"
[ -f "$PATCH_CLI" ]  || die "lib/patch-prompts.mjs missing — is the repo intact?"
if [ ! -d "$LIB_DIR/node_modules/node-lief" ]; then
  log "Installing lib/ dependencies (first run: node-lief, @babel/parser, prettier)"
  run "( cd '$LIB_DIR' && npm install )"
fi

# Install scripts/ deps on first run (gray-matter, used by sync-version.mjs).
if [ ! -d "$SCRIPTS_DIR/node_modules/gray-matter" ]; then
  log "Installing scripts/ dependencies (first run: gray-matter)"
  run "( cd '$SCRIPTS_DIR' && npm install --ignore-scripts --save-exact )"
fi

# --- choose the CC version to target ---------------------------------------
# Works whether or not Claude Code is installed. We can only patch a version we
# have a prompt catalog for, so the default target is the newest such version;
# an already-installed *supported* version is respected as-is (no churn).
log "Resolving target Claude Code version"

# Newest version we have a catalog for (the newest we can patch).
SUPPORTED_LATEST="$(ls "$PROMPTS_DIR"/prompts-*.json 2>/dev/null \
  | sed -n 's#.*/prompts-\([0-9][0-9.]*\)\.json$#\1#p' | sort -V | tail -1)"
[ -n "$SUPPORTED_LATEST" ] || die "no prompt catalogs in $PROMPTS_DIR — is the repo intact?"

# Newest published CC (best-effort; network). Purely informational.
NPM_LATEST=""
command -v npm >/dev/null && NPM_LATEST="$(npm view @anthropic-ai/claude-code version 2>/dev/null || true)"

# Currently-installed CC version, if any.
INSTALLED_VERSION=""
command -v claude >/dev/null && \
  INSTALLED_VERSION="$(claude --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"

# Target: explicit --version wins; else keep a supported installed version; else
# fall back to the newest version we can patch.
if [ -n "$WANT_VERSION" ]; then
  CC_VERSION="$WANT_VERSION"
elif [ -n "$INSTALLED_VERSION" ] && [ -f "$PROMPTS_DIR/prompts-$INSTALLED_VERSION.json" ]; then
  CC_VERSION="$INSTALLED_VERSION"
else
  CC_VERSION="$SUPPORTED_LATEST"
fi

CATALOG="$PROMPTS_DIR/prompts-$CC_VERSION.json"
[ -f "$CATALOG" ] || die "no prompt catalog for v$CC_VERSION at $CATALOG.
    We have catalogs up to v$SUPPORTED_LATEST. Run  ./upgrade.sh  against a v$CC_VERSION
    binary to generate it, or pass --version <a supported release>."

# Report the gap between what CC ships and what we can patch.
if [ -n "$NPM_LATEST" ] && [ "$NPM_LATEST" != "$SUPPORTED_LATEST" ] && \
   [ "$(printf '%s\n%s\n' "$NPM_LATEST" "$SUPPORTED_LATEST" | sort -V | tail -1)" = "$NPM_LATEST" ]; then
  warn "Claude Code latest is v$NPM_LATEST; unnerfcc has prompts only up to v$SUPPORTED_LATEST → targeting v$CC_VERSION."
  warn "  To support v$NPM_LATEST, run ./upgrade.sh against it first."
fi
ok "target version: v$CC_VERSION (catalog: $CATALOG)"

# --- ensure CC is installed at the target version --------------------------
if [ "$INSTALLED_VERSION" != "$CC_VERSION" ]; then
  command -v npm >/dev/null || die "need Claude Code v$CC_VERSION but npm is unavailable to install it"
  if [ -n "$INSTALLED_VERSION" ]; then
    log "Installed Claude Code is v$INSTALLED_VERSION — switching to v$CC_VERSION (the version unnerfcc patches)"
  else
    log "Claude Code not found on PATH — installing v$CC_VERSION"
  fi
  run "npm install -g '@anthropic-ai/claude-code@$CC_VERSION'"
  if [ "$DRY_RUN" != 1 ]; then
    hash -r 2>/dev/null || true
    if ! command -v claude >/dev/null; then
      NPM_BIN="$(npm config get prefix 2>/dev/null)/bin"
      if [ -x "$NPM_BIN/claude" ]; then
        PATH="$NPM_BIN:$PATH"; export PATH
        warn "added npm global bin to PATH for this run: $NPM_BIN (add it to your shell profile to keep 'claude' available)"
      fi
    fi
    command -v claude >/dev/null || die "installed Claude Code but 'claude' is still not on PATH — add \"\$(npm config get prefix)/bin\" to your PATH and re-run"
  fi
fi

# --- resolve binary --------------------------------------------------------
log "Resolving Claude Code binary"
if [ "$DRY_RUN" = 1 ] && ! command -v claude >/dev/null; then
  ok "dry-run: would target v$CC_VERSION (binary not resolved — not installed)"
else
  LAUNCHER="$(command -v claude)"
  CC_BIN="$(readlink -f "$LAUNCHER" 2>/dev/null || echo "$LAUNCHER")"
  [ -f "$CC_BIN" ] || die "could not resolve the claude binary from $LAUNCHER"
  RESOLVED_VERSION="$(claude --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
  [ "$RESOLVED_VERSION" = "$CC_VERSION" ] || \
    warn "resolved binary reports v$RESOLVED_VERSION but targeting v$CC_VERSION — a stale launcher may be shadowing it"
  ok "binary: $CC_BIN (v$CC_VERSION)"
fi

# --- rebuild stock + replay un-nerfs ---------------------------------------
log "Rebuilding stock prompts + replaying un-nerfs"
run "node '$REPO/scripts/sync-version.mjs' '$CC_VERSION'"
run "python3 '$REPO/scripts/apply-unnerfs.py' --quiet"
run "python3 '$REPO/scripts/apply-unnerfs.py' --check --quiet" || die "apply-unnerfs --check not clean"
ok "un-nerfed .md set ready in system-prompts/"

if [ "$DRY_RUN" = 1 ]; then log "[dry-run] would unpack, patch, repack, boot-check, verify, install"; exit 0; fi

# --- workspace --------------------------------------------------------------
# No backup: the patched binary is only swapped in AFTER a successful boot-check,
# and any earlier failure exits without touching the installed binary. To restore
# stock, reinstall Claude Code (see the rollback note at the end).
WORK="$(mktemp -d "${TMPDIR:-/tmp}/unnerfcc-install-XXXX")"; trap 'rm -rf "$WORK"' EXIT

# --- unpack -> patch -> repack ---------------------------------------------
CLI_JS="$WORK/cli.js"; PATCHED_JS="$WORK/patched.js"; PATCHED_BIN="$WORK/claude.patched"
log "Unpacking JS bundle"
set +e; OUT="$(node "$NATIVE_CLI" unpack "$CC_BIN" "$CLI_JS" 2>&1)"; RC=$?; set -e
echo "$OUT" | grep -q BUN_FORMAT_INCOMPATIBLE && bun_incompatible "$OUT"; [ $RC -eq 3 ] && bun_incompatible "$OUT"
[ $RC -eq 0 ] || die "unpack failed: $OUT"
ok "unpacked $(wc -c < "$CLI_JS" | awk '{printf "%.1fMB", $1/1048576}')"

log "Splicing un-nerfed prompts into the bundle"
# Exit codes: 0 ok · 2 output is invalid JS (must NOT repack) · 3 a real un-nerf
# failed to splice (output is valid, just missing that one — ship the rest, warn
# loudly) · anything else is a crash. Capture the RC so pipefail can't abort us
# before we classify it.
set +e; SPLICE_OUT="$(node "$PATCH_CLI" apply "$CLI_JS" "$CATALOG" "$SYS_PROMPTS" "$PATCHED_JS" 2>&1)"; SRC=$?; set -e
echo "$SPLICE_OUT" | sed 's/^/    /'
case "$SRC" in
  0) : ;;
  3) warn "one or more un-nerfs did NOT reach the binary (see [LOST] above) — shipping the remaining un-nerfs; fix the catalog pieces/rule anchor and re-run" ;;
  *) die "prompt splice failed (exit $SRC) — see output above" ;;
esac

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
