# Upgrading unnerfcc to a new Claude Code release

unnerfcc is **standalone**: it generates its own prompt catalog and patches the
Claude Code binary itself, without depending on the tweakcc-fixed *project*
(no clone, no build-from-`main`, no waiting for skrabe to publish a catalog).
The toolkit that does this is our own, under [`lib/`](lib) — no tweakcc code; it
uses only general libraries (node-lief for the ELF/Bun surgery, `@babel/parser`
to parse, prettier to un-minify).

The whole upgrade is one command:

```bash
./upgrade.sh
```

## What `upgrade.sh` does

| Step | Action | Component |
|---|---|---|
| 1 | Detect installed CC version; find our latest catalog | — |
| 2 | Unpack the JS bundle from the CC native binary | `lib/bun-binary.mjs` (node-lief) |
| 3 | Extract a fresh prompt catalog, **seed-driven** so known prompts keep their ids and the extractor's over-inclusion never reaches the catalog | `lib/extract-prompts.mjs` + `scripts/gen-catalog.mjs` |
| 4 | SHA-256-diff new vs previous → the relabel worklist | `scripts/prompt-index.mjs` |
| 5 | **Launch Claude Code headless to semantically label** the new/changed fragments the extractor couldn't identify | `scripts/relabel.mjs` + `claude -p` |
| 6 | Validate the catalog (structural gates) | `scripts/validate-catalog.mjs` |
| 7 | Reconstruct stock `.md` + replay un-nerfs | `scripts/sync-version.mjs`, `scripts/apply-unnerfs.py` |
| 8 | Verify the un-nerfs still patch the binary (patch → repack → boot-check) | `lib/patch-prompts.mjs` + `lib/bun-binary.mjs` |
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
- **Seed-driven catalog + Claude does only the delta.** Our extractor favors
  recall (it emits every prompt-like literal, ~9k, including error/library
  strings), so `gen-catalog.mjs` anchors the catalog to the *previous* one:
  every known prompt is matched to its current extracted form (id carried,
  pieces refreshed), and the extractor's over-inclusion is diverted to a
  `*.candidates.json` for review — never polluting the catalog. Only the few
  dozen reworded/new fragments reach Claude (**Opus**), which proposes a
  `name` + `description` and a per-`${…}`-slot binding audit against the
  worklist, the previous catalog, and `UNNERF-GUIDE.md`. For a **reworded**
  prompt Claude is told to **preserve the existing id** (our rules are keyed to
  it).

## The one manual beat: review + bucket-analysis

`upgrade.sh` stops short of committing. After it runs:

1. **Review the relabels.** Claude's labels are validated (unique, slot-complete,
   id-stable) but semantic — skim `data/prompts/prompts-<version>.json`'s new
   entries. (At patch time `lib/patch-prompts.mjs` re-checks slot alignment and
   **fails closed** — skips rather than splice — on any capture/identifier count
   mismatch, so a mis-bound `${…}` can never reach the binary.) Category prefixes (`tool-parameter-` vs `tool-result-`) are the most
   common thing to hand-correct; the id string itself is ours to choose (it need
   not match skrabe).
2. **Bucket-analyze new/changed prompts** per [UNNERF-GUIDE.md](UNNERF-GUIDE.md)
   Part 1 and add un-nerf rules to `scripts/apply-unnerfs.py` where warranted.
3. `python3 scripts/apply-unnerfs.py --check` must be clean (0 FAILED, 0 missing).
4. Commit the catalog, `system-prompts/*.md`, `system-prompt-checksums.json`, and
   any rule/`lib/` changes.

## Applying to your own binary

`upgrade.sh` prepares the repo. To patch YOUR Claude Code binary with the
un-nerfed prompts, run [`install.sh`](install.sh) (also standalone — same
`lib/` patcher + binary I/O).

## If the Bun format changed

`lib/bun-binary.mjs` detects a container format it doesn't understand and
`upgrade.sh` / `install.sh` STOP with a `BUN_FORMAT_INCOMPATIBLE` banner: Bun
changed its standalone-binary layout. Update the format constants/logic in
`lib/bun-binary.mjs` for the new layout — its file header documents the format
(section → `[u64 size][blob]`, blob → `[data][OFFSETS][TRAILER]`, module
structs), and a current tweakcc-fixed's `nativeInstallation.ts` is a useful
reference if you need to see how the new format is handled. This is the only
part that tracks Bun internals.

## First-run setup

`lib/`'s deps install themselves on the first `upgrade.sh`/`install.sh` run
(`cd lib && npm install`: node-lief, @babel/parser, prettier). Requirements:
Node ≥ 20, Python 3, the `claude` CLI, and a C toolchain for `node-lief`'s
native addon.
