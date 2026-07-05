# Vendored from tweakcc-fixed

This directory holds code **copied verbatim** from
[skrabe/tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed) so unnerfcc can
process a new Claude Code release **without depending on the tweakcc-fixed
project** (no clone, no build-from-`main`, no waiting on skrabe to publish a
prompt catalog). We hold a pinned copy; we re-vendor only when the Bun binary
format changes.

| Path | Source (in tweakcc-fixed) | Purpose |
|---|---|---|
| `tools/promptExtractor.js` | `tools/promptExtractor.js` | AST-extract the prompt catalog from the CC JS bundle |
| `data/prompt-classification.json` | `data/prompt-classification.json` | SHA-1-keyed model/ui/internal classification cache the extractor consults (must sit at `../data` relative to the extractor) |
| `native/nativeInstallation.ts` | `src/nativeInstallation.ts` | Extract/repack the JS bundle in the Bun-compiled native binary (via `node-lief`) |
| `native/utils.ts` | (shim) | Minimal `isDebug`/`debug` the above needs |

**Pinned at:** tweakcc-fixed `v2.6.4`, commit `5d93f39b67f4b067b83894419f2b5577c09cee78` (CC 2.1.201).

**License:** tweakcc-fixed is a fork of [Piebald-AI/tweakcc](https://github.com/Piebald-AI/tweakcc); this code carries its upstream license. Prompt text extracted by it remains Anthropic's copyright (see repo README).

## When to re-vendor

Re-copy the files above from a fresh tweakcc-fixed checkout when:
- **The Bun binary format changes** — `upgrade.sh` detects this and prints
  `BUN_FORMAT_INCOMPATIBLE`; update `native/nativeInstallation.ts` (+ rebuild).
- The extractor starts mislabeling many prompts on a new CC release in a way our
  Claude-relabel pass can't fix (a `validateInput` heuristic drift) — update
  `tools/promptExtractor.js`.

To re-vendor: `git clone https://github.com/skrabe/tweakcc-fixed`, copy the four
files above to their paths here, bump the commit hash in this file, rebuild
(`cd native && npm install && npm run build`), and re-run `upgrade.sh`.
