# Upgrading unnerfcc to a new Claude Code release

unnerfcc is **standalone**: it generates its own prompt catalog and patches the
Claude Code binary itself, without depending on the tweakcc-fixed *project*
(no clone, no build-from-`main`, no waiting for skrabe to publish a catalog).
The tweakcc code we need is **vendored** under [`vendor/tweakcc/`](vendor/tweakcc)
(see its `UPSTREAM.md`).

The whole upgrade is one command:

```bash
./upgrade.sh
```

## What `upgrade.sh` does

| Step | Action | Component |
|---|---|---|
| 1 | Detect installed CC version; find our latest catalog | — |
| 2 | Unpack the JS bundle from the CC native binary | `vendor/tweakcc/native` (node-lief) |
| 3 | Extract a fresh prompt catalog, **seeded with our previous one** so unchanged/reworded prompts keep their ids | `vendor/tweakcc/tools/promptExtractor.js` + `scripts/gen-catalog.mjs` |
| 4 | SHA-256-diff new vs previous → the relabel worklist | `scripts/prompt-index.mjs` |
| 5 | **Launch Claude Code headless to semantically label** the new/changed fragments the extractor couldn't identify | `scripts/relabel.mjs` + `claude -p` |
| 6 | Validate the catalog (structural gates) | `scripts/validate-catalog.mjs` |
| 7 | Reconstruct stock `.md` + replay un-nerfs | `scripts/sync-version.mjs`, `scripts/apply-unnerfs.py` |
| 8 | Verify the un-nerfs still patch the binary (patch → repack → boot-check) | `vendor/tweakcc/patch` + `vendor/tweakcc/native` |
| 9 | Leave everything staged for your review + commit | — |

## Why this design

- **Catalog independence (the main win).** We no longer download
  `prompts-<version>.json` from skrabe — `gen-catalog.mjs` produces it on release
  day. The catalog lives in [`data/prompts/`](data/prompts) and **we own it**.
- **Two SHA-256 hashes per prompt** (`scripts/prompt-index.mjs`):
  - *identity hash* = `sha256(pieces.join(''))` — label-independent; the stable
    key for carrying a prompt's id/name/description/identifierMap across versions.
    An unchanged prompt hashes equal → its id is carried verbatim. **This is what
    keeps `apply-unnerfs.py`'s id-keyed rules stable.**
  - *drift hash* = `sha256(reconstructed body)` — the change-detection signal
    (successor to the old MD5 `system-prompt-checksums.json`).
- **Claude does only the delta.** The extractor (seeded) already carries ids for
  the ~97% of prompts that didn't change, and names anything in skrabe's frozen
  `NEW_PROMPT_ASSIGNMENTS`. Only the few dozen genuinely-new/reworded fragments
  per release reach Claude — pointed at `LABELING-TASK.md`, the worklist, the
  previous catalog, and `UNNERF-GUIDE.md`. For a **reworded** prompt Claude is
  told to **preserve the existing id** (our rules are keyed to it).

## The one manual beat: review + bucket-analysis

`upgrade.sh` stops short of committing. After it runs:

1. **Review the relabels.** Claude's labels are validated (unique, slot-complete,
   id-stable) but semantic — skim `data/prompts/prompts-<version>.json`'s new
   entries. Category prefixes (`tool-parameter-` vs `tool-result-`) are the most
   common thing to hand-correct; the id string itself is ours to choose (it need
   not match skrabe).
2. **Bucket-analyze new/changed prompts** per [UNNERF-GUIDE.md](UNNERF-GUIDE.md)
   Part 1 and add un-nerf rules to `scripts/apply-unnerfs.py` where warranted.
3. `python3 scripts/apply-unnerfs.py --check` must be clean (0 FAILED, 0 missing).
4. Commit the catalog, `system-prompts/*.md`, `system-prompt-checksums.json`, and
   any rule/vendor changes.

## Applying to your own binary

`upgrade.sh` prepares the repo. To patch YOUR Claude Code binary with the
un-nerfed prompts, run [`install.sh`](install.sh) (also standalone — same
vendored patcher + native I/O).

## If the Bun format changed

The native I/O detects a container format it doesn't understand and
`upgrade.sh` / `install.sh` STOP with a `BUN_FORMAT_INCOMPATIBLE` banner. Bun
changed its standalone-binary layout. Re-vendor `vendor/tweakcc/native/` from a
current tweakcc-fixed (that project tracks Bun format changes) per
[`vendor/tweakcc/UPSTREAM.md`](vendor/tweakcc/UPSTREAM.md), rebuild
(`vendor/tweakcc/build.sh`), and re-run. This is the *only* time we need
tweakcc-fixed, and it's a `cp` + rebuild, not a project dependency.

## First-run setup

The vendored modules build themselves on first `upgrade.sh`/`install.sh` run
(`vendor/tweakcc/build.sh`: `npm install` + esbuild). Requirements: Node ≥ 20,
Python 3, the `claude` CLI, and a C toolchain for `node-lief`'s native addon.
