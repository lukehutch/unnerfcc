# Vendored native-binary I/O module

These files are copied from **tweakcc-fixed@2.6.4**
(commit `5d93f39b67f4b067b83894419f2b5577c09cee78`), used under its MIT license
(see `LICENSE`, Copyright (c) 2025 Piebald LLC).

| File | Origin | Modified? |
| --- | --- | --- |
| `nativeInstallation.ts` | `src/nativeInstallation.ts` | verbatim copy — do not edit its logic |
| `utils.ts` | reduced shim of `src/utils.ts` | new — exports only `isDebug` / `debug` |
| `cli.mjs` | new | thin unpack/repack CLI wrapper |
| `LICENSE` | `LICENSE` | verbatim |

`nativeInstallation.ts` parses the Bun standalone container inside a Claude Code
native binary (via `node-lief`, kept external), extracts the `claude` JS module,
and rebuilds the container after edits.

## Re-vendor on Bun-format change

If `cli.mjs` exits with code **3** (`BUN_FORMAT_INCOMPATIBLE: ...`), the Bun
standalone container layout has drifted and this parser can no longer read the
binary. Re-copy `nativeInstallation.ts` (and re-check `utils.ts` imports) from
the current tweakcc-fixed, then rebuild (`npm install && npm run build`).
