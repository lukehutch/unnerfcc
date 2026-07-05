#!/usr/bin/env bash
#
# build.sh — install deps + build the vendored tweakcc modules.
#
# The vendored modules (native binary I/O, prompt patcher) are TypeScript/JS
# copied from tweakcc-fixed; their node_modules and dist/ are NOT committed
# (node-lief is a platform-specific native addon), so they must be built once
# per machine. upgrade.sh and install.sh call this automatically when a build
# is missing. Safe to re-run (idempotent).
#
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

command -v node >/dev/null || { echo "build.sh: node not found" >&2; exit 1; }

build_module() {
  local dir="$1"
  [ -d "$dir" ] || { echo "  (skip $dir — not vendored)"; return 0; }
  echo "==> building vendor/tweakcc/$dir"
  ( cd "$dir" && npm install --silent && npm run build --silent )
  [ -f "$dir/dist/cli.mjs" ] && echo "  ✓ $dir/dist/cli.mjs"
}

# tools/ only needs deps (no build) — the extractor runs from source.
if [ -d tools ]; then
  echo "==> installing vendor/tweakcc/tools deps (@babel/parser)"
  ( cd tools && npm install --silent )
fi

build_module native
build_module patch

echo "vendored modules ready."
