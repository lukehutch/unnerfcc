# Vendored system-prompt patcher module

These files are copied from **tweakcc-fixed** (the `skrabe/tweakcc-fixed` fork),
used under its MIT license (see `LICENSE`, Copyright (c) 2025 Piebald LLC). This
module is the "apply un-nerfs to the binary" step: it splices our edited
system-prompt `.md` files into an already-unpacked Claude Code JS bundle, using a
per-version prompt **catalog** (`prompts-<version>.json`, a `StringsFile`) that
maps each prompt id to its cli.js anchor "pieces" and identifier map.

It reads the catalog from a **local path** (`UNNERF_CATALOG_PATH`) — it never
touches the network. Pair it with the sibling `../native` module to unpack the JS
from a binary and repack it afterward.

## Files

| File | Origin | Modified? |
| --- | --- | --- |
| `patches/systemPrompts.ts` | `src/patches/systemPrompts.ts` | verbatim copy — do not edit its logic |
| `systemPromptSync.ts` | `src/systemPromptSync.ts` | verbatim EXCEPT the `loadIdentifierMapUnion` fallback that dynamic-`import()`ed `./generated/identifierUnion.js` was dropped (unreachable here — the union is always loaded from the catalog dir; dropping it keeps esbuild's bundle graph closed). Marked with a `VENDOR NOTE`. |
| `safeRegexMatch.ts` | `src/safeRegexMatch.ts` | verbatim copy (worker-thread stack fallback) |
| `config.ts` | reduced shim of `src/config.ts` | new — exports only the 4 path constants, sourced from env vars |
| `systemPromptDownload.ts` | rewritten shim of `src/systemPromptDownload.ts` | new — reads the catalog from `UNNERF_CATALOG_PATH` instead of GitHub; `findRepoPromptsDir` returns the catalog's dir |
| `systemPromptHashIndex.ts` | reduced shim of `src/systemPromptHashIndex.ts` | new — real `computeMD5Hash`; the disk-backed index writes are no-ops |
| `patches/index.ts` | reduced shim of `src/patches/index.ts` | new — exports only `PatchGroup` (verbatim enum), `PatchResult` (verbatim interface), and a no-op `showDiff`; avoids the full patch/TUI registry |
| `patches/systemReminderOverrides.ts` | reduced shim of `src/patches/systemReminderOverrides.ts` | new — exports only `REMINDER_REGISTRY`, carrying just the `shadows:` id lists that `loadShadowSet` unions (3 entries as of this revision) |
| `utils.ts` | reduced shim of `src/utils.ts` | new — `escapeNonAscii` + `stringifyRegex` copied verbatim; `debug`/`verbose` env-gated |
| `setEnv.ts` | new | argv → env bootstrap, imported first by `cli.mjs` so config/download see the vars before init |
| `cli.mjs` | new | thin `apply` CLI wrapper |
| `LICENSE` | `LICENSE` | verbatim |

## Import subtree that was cut / stubbed

`applySystemPrompts` (in `patches/systemPrompts.ts`) transitively pulls
`./index` (the whole-app patch registry, which imports ink/react/every patch)
and `systemPromptSync` pulls `config`, `systemPromptDownload`,
`systemPromptHashIndex`, `utils`, and `patches/systemReminderOverrides`. Only a
small surface of each is used by the patch code path, so each heavy import was
replaced with a focused shim (see table). Nothing that reaches the TUI/ink/react,
the network, or user config-dir persistence is bundled.

## Usage

```
node dist/cli.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>
```

Prints `patched=`, `skipped=`, `rejectedWithDetails=`, `couldNotFind=`,
`failed=`. A non-zero `couldNotFind` means that many prompt anchors did not match
the binary — expected when the catalog version differs from the binary version.

## Build

```
npm install    # local vendor-dir install only; no global installs
npm run build  # esbuild bundles cli.mjs + the .ts graph -> dist/cli.mjs
```

## Re-vendor

When re-copying `patches/systemPrompts.ts` / `systemPromptSync.ts` /
`safeRegexMatch.ts` from a newer tweakcc-fixed: re-apply the single
`systemPromptSync.ts` edit (drop the `./generated/identifierUnion.js` fallback),
and re-check that the shim surfaces still match — especially the `shadows:` id
lists in the upstream `REMINDER_REGISTRY` (grep `shadows:` in
`src/patches/systemReminderOverrides.ts`) and the `PatchGroup`/`PatchResult`
shapes in `src/patches/index.ts`.
