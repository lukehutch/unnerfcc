# Upgrading unnerfcc to a new Claude Code release

unnerfcc is **standalone**: it generates its own prompt catalog and patches the
Claude Code binary itself, without depending on the tweakcc-fixed *project*
(no clone, no build-from-`main`, no waiting for skrabe to publish a catalog).
The toolkit that does this is our own, under [`engine/`](engine) — no tweakcc code; it
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
| 2 | Unpack the JS bundle from the CC native binary | `engine/bun-binary.mjs` (node-lief) |
| 3 | Extract a fresh prompt catalog, **seed-driven** so known prompts keep their ids and the extractor's over-inclusion never reaches the catalog | `engine/extract-prompts.mjs` + `scripts/gen-catalog.mjs` |
| 4 | SHA-256-diff new vs previous → the relabel worklist | `scripts/prompt-index.mjs` |
| 5 | **Launch Claude Code headless to semantically label** the new/changed fragments the extractor couldn't identify | `scripts/relabel.mjs` + `claude -p` |
| 6 | Validate the catalog (structural gates) | `scripts/validate-catalog.mjs` |
| 7 | Reconstruct stock `.md` | `scripts/sync-version.mjs` |
| 8 | **Launch Claude Code headless to bucket-analyze** every new un-nerf candidate against the fresh stock text — decide keep/lift per `UNNERF-GUIDE.md` Part 1, draft any warranted rule; mechanically validated (stock occurs exactly once, no new `${VAR}` introduced, no overlap with an existing rule) and merged into `apply-unnerfs.py` | `scripts/bucket-analyze.mjs` + `claude -p` |
| 9 | Replay all un-nerfs (existing + whatever step 8 just added); `apply-unnerfs.py --check` gates the release | `scripts/apply-unnerfs.py` |
| 10 | Patch-verify: splice → effort pass → posture diff → repack → boot-check; a **lost un-nerf (exit 3) blocks the release** | `engine/patch-prompts.mjs` + `engine/apply-code-patches.mjs` + `engine/bun-binary.mjs` |
| 11 | Leave everything staged for your review + commit | — |

## Why this design

- **Catalog independence (the main win).** We no longer download
  `prompts-<version>.json` from skrabe — `gen-catalog.mjs` produces it on release
  day. The catalog lives in [`data/prompts/`](data/prompts) and **we own it**.
- **Two SHA-256 hashes per prompt** (`scripts/prompt-index.mjs`):
  - *identity hash* = `sha256` over the **cooked** pieces (each finished-decoded
    to its literal runtime value) joined with a NUL — label-independent, and
    independent of the source spelling that produced the string. The stable key
    for carrying a prompt's id/name/description/identifierMap across versions.
    An unchanged prompt hashes equal → its id is carried verbatim. **This is what
    keeps `apply-unnerfs.py`'s id-keyed rules stable.** Matching is **pure
    hashing** — no fuzzy/prefix fallback: one changed character is a miss, and a
    miss routes the string back through classification instead of being guessed
    onto an ancestor id.
  - *drift hash* = `sha256(reconstructed body)` — the change-detection signal
    (successor to the old MD5 `system-prompt-checksums.json`).
- **Seed-driven catalog + Claude does only the delta.** Our extractor favors
  recall (it emits every prompt-like literal, ~9k, including error/library
  strings), so `gen-catalog.mjs` anchors the catalog to the *previous* one:
  every known prompt is matched to its current extracted form (id carried,
  pieces refreshed), and the extractor's over-inclusion is diverted to a
  `*.candidates.json` for review — never polluting the catalog. Only the few
  dozen reworded/new fragments reach Claude (**Opus 5, `--effort medium`**),
  which proposes a `name` + `description` and a per-`${…}`-slot binding audit
  against the worklist, the previous catalog, and `UNNERF-GUIDE.md`.
- **Rewords are re-identified, not guessed.** A reword misses the identity hash,
  so it arrives as a *removed* old id plus an *added* fresh fragment. `relabel.mjs
  prepare` writes `removed.json` alongside the worklist and instructs Claude: if a
  fragment is a reword of something that just disappeared, **re-use that id
  verbatim** — `apply-unnerfs.py`'s rules are keyed to `<id>.md`, and a churned id
  silently orphans an un-nerf. Fresh strings Claude classified as prompts with
  `ccFirstSeen == <this version>` are auto-admitted to the catalog so the reworded
  prompt has an entry to be named.

## Bucket-analysis is automated

Deciding whether a new or reworded prompt needs an un-nerf rule — and drafting
it — is no longer a manual step. `scripts/bucket-analyze.mjs` does what
`relabel.mjs` does for naming: an AI step proposes structured decisions, code
mechanically validates and merges them, with hard gates rather than trust.

Concretely: it takes `data/unnerf-candidates.json`'s entries for this release
(the classifier's own high-recall "this looks nerfy" flags — see
`scripts/classify.mjs`), has a headless `claude -p` session read each
candidate's actual current stock text plus `UNNERF-GUIDE.md` Part 1's keep/lift
decision procedure, and for each one either keeps it (with reasoning) or drafts
a `Rule(stock, unnerf, description)`. Before any rule reaches
`scripts/apply-unnerfs.py`, `bucket-analyze.mjs merge` verifies mechanically —
not by trusting the model's say-so — that the proposed `stock` text occurs
**exactly once** in the file's real on-disk content, that `unnerf` introduces
no `${VAR}` the prompt doesn't already have (register rule 6), and that it
doesn't overlap any already-registered rule for the same file (which would
make `apply-unnerfs.py`'s ordered replacement pass fail on whichever rule runs
second). A rule that fails any check is dropped with a warning — a candidate
left unaddressed for one release is a minor miss, not a release blocker.
Every verdict, KEEP and LIFT alike, together with the model's reasoning, is
written to `data/bucket-analysis-<version>.json` for audit — that file is
`scripts/apply-unnerfs.py`'s reasoning ledger, not something you need to redo.
`python3 scripts/apply-unnerfs.py --check` is the real gate: `upgrade.sh` dies
if the newly-merged rules don't leave it clean.

## Review before committing

`upgrade.sh` still stops short of committing — every step above runs
automatically, but nothing ships until you review the diff:

1. **Skim the relabels** in `data/prompts/prompts-<version>.json`'s new
   entries. Claude's labels are validated (unique, slot-complete, id-stable)
   but semantic. (At patch time `engine/patch-prompts.mjs` re-checks slot
   alignment and **fails closed** on any capture/identifier mismatch — a
   benign skip is a silent no-op, but a mismatch that would **lose an un-nerf
   raises a banner and exits 3** (a release blocker in `upgrade.sh`), so a
   mis-bound `${…}` can never reach the binary.) Category prefixes
   (`tool-parameter-` vs `tool-result-`) are the most common thing to
   hand-correct; the id string itself is ours to choose (it need not match
   skrabe).
2. **Skim `data/bucket-analysis-<version>.json`** — every new rule
   `bucket-analyze.mjs` added, every candidate it kept and why, and anything
   it rejected on a mechanical check. Disagree with a call? Hand-edit
   `scripts/apply-unnerfs.py` (or add a rule of your own) the same as always —
   automation proposes, it doesn't have the last word.
3. Commit the catalog, `system-prompts/*.md`, `system-prompt-checksums.json`,
   `scripts/apply-unnerfs.py`, `data/bucket-analysis-<version>.json`, and any
   `engine/` changes.

## Applying to your own binary

`upgrade.sh` prepares the repo. To patch YOUR Claude Code binary with the
un-nerfed prompts, run [`install.sh`](install.sh) (also standalone — same
`engine/` patcher + binary I/O).

## If the Bun format changed

`engine/bun-binary.mjs` detects a container format it doesn't understand and
`upgrade.sh` / `install.sh` STOP with a `BUN_FORMAT_INCOMPATIBLE` banner: Bun
changed its standalone-binary layout. Update the format constants/logic in
`engine/bun-binary.mjs` for the new layout — its file header documents the format
(section → `[u64 size][blob]`, blob → `[data][OFFSETS][TRAILER]`, module
structs), and a current tweakcc-fixed's `nativeInstallation.ts` is a useful
reference if you need to see how the new format is handled. This is the only
part that tracks Bun internals.

## First-run setup

`engine/`'s deps install themselves on the first `upgrade.sh`/`install.sh` run
(`cd engine && npm install`: node-lief, @babel/parser, prettier). Requirements:
Node ≥ 20, Python 3, a C toolchain for `node-lief`'s native addon, and `npm`.
`upgrade.sh` additionally needs the `claude` CLI (for relabeling and
bucket-analysis, both headless `claude -p` calls); `install.sh` auto-installs
Claude Code via npm if it isn't already on PATH.
