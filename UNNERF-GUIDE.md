# The un-nerf guide — objectives & upgrade playbook

This is the single source of truth for **what this project is trying to do** and
**how to upgrade it when Anthropic ships a new Claude Code version**. If you are
re-running the sync against a newer Claude Code, read Part 1 (so you make the
right keep/flip calls) then follow Part 2 (the workflow). The later parts are the
reference detail behind each step.

> Companion docs: [README](README.md) (what/why for users), [MAINTENANCE](MAINTENANCE.md)
> (script flags), [BACKGROUND](BACKGROUND.md) (history, how tweakcc-fixed works).
> This guide supersedes and unifies the "upgrade" material in those.

---

## Part 1 — The objective

Claude Code's stock prompts contain far more instructions to **be brief** than to
**be thorough** — roughly 5:1. That imbalance makes the model cut corners on real
work. This project rebalances it. The goal is **not verbosity** — it is
**thoroughness**. The stock prompts conflate the two; they are not the same.

Every stock brevity directive falls into one of four buckets. The whole project
is one rule applied consistently:

> **Keep bucket 1. Flip buckets 2 and 3. Amplify bucket 4.**

| # | Bucket | What it controls | Action | Example |
|---|--------|------------------|--------|---------|
| 1 | **Chat brevity** | length of conversational replies to trivial asks | **KEEP** | "respond in 2-3 sentences", "a terse one-liner is fine" for *what's the git status* |
| 2 | **Implementation brevity** | the *code* Claude writes | **FLIP** | "don't add abstractions", "simplest approach", "don't gold-plate", "do the minimum" |
| 3 | **Process brevity** | how Claude *investigates and reports to a human* | **FLIP** | "as quickly as possible", "report back concisely", "2-sentence summary", "briefly explain" |
| 4 | **Thoroughness** | "think step by step", "consider edge cases" | **AMPLIFY** | already pro-quality — strengthen it |

### The keep/flip decision procedure

When a prompt contains a brevity-signature phrase, decide with this checklist
(in order — the first match wins):

1. **Is the output a structured artifact or machine-parsed?** A title, branch
   name, commit message, JSON object, classification label, autocomplete
   suggestion, a status string parsed by a script, a notification with an
   explicit character cap. → **KEEP.** Length here is UX/format, not work depth.
   (`agent-prompt-session-title-and-branch-generation`, `system-prompt-insights-*`,
   `agent-prompt-workflow-subagent-plain-text-output`.)
2. **Is it a functional constraint?** "minimal `old_string` for uniqueness",
   "no preamble before the *required* tool call", "avoid sleep-polling",
   "CLAUDE.md must be concise" (it loads into every session). → **KEEP.** The
   brevity is doing real mechanical work.
3. **Is it safety / security?** Deny-rules, confirmation gates, classifier
   guidance. → **KEEP** (or make *stricter* — never weaker). A *fuller*
   explanation that helps a human's safety decision is a legitimate flip of the
   *explanation*, not the gate (see `system-prompt-troubleshooting-confirmation-policy`).
4. **Is it reference / documentation / example content?** Every `data-*.md` blob,
   API docs, sample prompts quoted inside a guide. → **KEEP.** A length cap
   *inside an example* is not a directive to Claude.
5. **Otherwise — does it cap engineering depth or human-facing reporting?**
   "simplest approach", "don't add/refactor/abstract", "investigate as quickly as
   possible", "keep your report short", a 2-sentence cap on an end-of-turn or
   subagent-to-human summary. → **FLIP** to thoroughness.

The hardest calls are subagent prompts: a subagent's report **to a human or to an
orchestrating agent that needs detail** should be thorough (flip), but a subagent
whose output is **parsed by a workflow script** should stay concise (keep). Same
word, opposite call — decide by *who consumes the output*.

When you flip, write the replacement in the project's voice: lead with the
*requirement* ("Make your review exhaustive…"), not the prohibition; preserve any
genuinely-good clause already present (safety caveats, "never half-finished");
keep it about **depth and completeness**, never about padding word count.

### Writing the flip — register rules

How a flip is *worded* matters as much as what it flips. Current Claude models
follow plain directives more literally than older ones, and overcorrect on
rhetorical pressure — which for this project means over-verbosity, our known
failure mode. These rules distill Anthropic's prompting guidance plus field
lessons from [lobotomized-claude-code](https://github.com/skrabe/lobotomized-claude-code)
(the opposite project: it cuts prompts down per-model, and documents what
newer models do badly under). Apply them to every `unnerf` string:

1. **No CAPS theater.** `MUST` / `NEVER` / `ALWAYS` / `CRITICAL` trigger
   overcorrection. Plain imperatives outperform.
2. **Positive framing where a positive form exists.** "Do not minimize detail"
   → "include everything needed to act on it without re-investigating".
   Negative-framed clauses with no positive equivalent ("never ship a
   half-finished implementation") stay.
3. **Concrete requirements over exhortations.** "Handle the edge cases, error
   paths, and failure modes the task implies" beats "be very thorough". Name
   the behavior you want; skip the adverbs ("aggressively") and intensifiers
   ("far worse", "every time").
4. **State it once.** A requirement restated in three phrasings is scaffolding,
   not emphasis — and an over-long flip dilutes the prompt it lives in and
   costs tokens on every turn. If a sentence adds no new requirement, cut it.
5. **No motivational filler.** "…and then try a few more", "persistence is the
   point" — rhetoric after a rule that already covers it. Cut.
6. **Never introduce a `${VAR}` the prompt doesn't already have.** A
   placeholder outside the prompt's `identifierMap` is emitted into the
   binary's template literal verbatim and crashes Claude Code at launch
   (`ReferenceError`). `apply-unnerfs.py` enforces this automatically (the
   orphan-variable guard, Part 6) — don't fight it.

---

## Part 2 — The upgrade workflow (happy path)

> **Automated path:** the repo ships a `sync-and-release` skill
> ([`.claude/skills/sync-and-release/SKILL.md`](.claude/skills/sync-and-release/SKILL.md))
> that drives this whole workflow end-to-end — re-apply, drift resolution,
> bucket analysis, commit, tag, and GitHub release — with the exact phase
> checklist and non-negotiable git rules. Use it for a full release; the steps
> below are the underlying manual procedure it automates (and the source of
> truth it defers to).

When Anthropic ships Claude Code `X.Y.Z` and tweakcc-fixed has published
`prompts-X.Y.Z.json` (usually within hours — see Part 8):

```bash
# 0. one-time: install the gray-matter dep the sync script uses
cd scripts && npm install --ignore-scripts --save-exact && cd ..

# 1. Rebuild STOCK prompts for the new version AND auto-diff the checksum manifest.
#    This overwrites system-prompts/*.md with stock and rewrites
#    system-prompt-checksums.json. The diff it prints IS your review worklist.
node scripts/sync-version.mjs X.Y.Z --download

# 2. Replay the un-nerfs onto the fresh stock.
python3 scripts/apply-unnerfs.py

# 3. Read the apply report. Any [FAIL] = a rule whose stock text drifted (Part 6).
#    Fix rules until the report is all APPLIED/SKIP, then gate:
python3 scripts/apply-unnerfs.py --check    # exit 0 = idempotent & clean

# 4. Review the manifest diff from step 1 (Part 5):
#      CHANGED with a rule  -> apply-unnerfs already told you (FAIL) if it drifted
#      CHANGED without rule -> grep-triage + read; flip if it's a new bucket-2/3 nerf
#      ADDED                -> grep-triage + read each; most data-*/structured = keep
#      REMOVED              -> retire the rule(s) targeting it
git diff system-prompts/ system-prompt-checksums.json   # eyeball before committing

# 5. (optional, recommended) verify against the actually-installed binary (Part 7)

# 6. Commit the stock+un-nerf+manifest+rule changes together (Part 2, "commit").
```

**What `sync-version.mjs` prints (the key new behavior).** On every run it diffs
the freshly-generated stock against the manifest from the *previous* sync and
reports `CHANGED / ADDED / REMOVED / unchanged`, then rewrites the manifest for
the new version. This is the authoritative "what did Anthropic change" list —
and crucially it is **clean**: because it fingerprints *stock*, it is not
polluted by your own un-nerf edits the way `git diff` on the un-nerfed tree is.

If tweakcc-fixed has **not** published `prompts-X.Y.Z.json` yet, you can't run
the happy path — see Part 8 ("the publish lag") for what to do.

### Committing

Stage the prompt tree, the manifest, and any rule changes together:

```bash
git add system-prompts/ system-prompt-checksums.json scripts/apply-unnerfs.py
git commit   # message: "sync prompts to Claude Code vX.Y.Z (+/- rules, manifest)"
```

Commit while the diff is small and the context is fresh. Note in the message any
rules retired (removed prompts) or added (new nerfs), and any FAILs you resolved.

---

## Part 3 — Reading the prompts (where stock text comes from)

Claude Code ships as a compiled Bun **native binary** with its prompts baked in
as string literals. There are two ways to get the stock text:

### A. tweakcc-fixed's published JSON (the normal source)

tweakcc-fixed publishes one `prompts-X.Y.Z.json` per supported CC version at
`https://raw.githubusercontent.com/skrabe/tweakcc-fixed/refs/heads/main/data/prompts/`.
Each prompt object is `{ id, name, description, version, pieces[], identifiers[],
identifierMap }`. The `.md` body is reconstructed by interleaving `pieces` with
`${HUMAN_NAME}` placeholders from `identifierMap`; the frontmatter is `name`,
`description`, `ccVersion` (the version when *that prompt* last changed — **not**
the global CC version), and `variables`. `scripts/sync-version.mjs` does exactly
this, byte-identically to a tweakcc-fixed extraction.

The fork's catalog is ~2.5× the size of upstream tweakcc's (1,437 sites / 1,331
unique ids vs 540 for v2.1.198): it also captures per-turn fragments, the
*values* of interpolated `${VARIABLES}` (which are prompts in their own right —
see the Part 6 drift table), and compact `-concise`/`-short` variants of tool
descriptions. Three things upstream's JSON doesn't prepare you for:

- **Duplicate ids.** Some prompt ids appear at multiple binary sites (one JSON
  entry per site; ~53 dup ids in v2.1.198, all but one byte-identical).
  tweakcc-fixed's own extractor creates the `.md` from the **first** entry and
  skips the rest; `sync-version.mjs` does the same, so file counts are unique-id
  counts.
- **Generated variable names.** Fragments the fork discovers without editorial
  names get machine-generated placeholders
  (`${<PROMPT_ID>_VAR_0}`, `_VAR_1`, …) instead of human names like
  `${EXPLORE_SUBAGENT}`. Rules that target such fragments must spell the
  placeholders exactly as extracted.
- **`ccVersion: null`.** Fragments first catalogued by the fork's extractor may
  carry a null version — treat them as "current" and let the manifest track
  changes.

> tweakcc-fixed does **not** publish every patch release, and a fresh release can
> lag by hours-to-days. If the JSON for your installed version isn't up yet, see
> Part 8 ("the publish lag") — but the normal case is that the latest version is
> available.

### B. The installed binary, via `tweakcc-fixed unpack` (ground truth, version-independent)

`tweakcc-fixed unpack` extracts the bundled JS from *any* installed binary
without needing published JSON — useful to (a) verify the JSON-derived prompts
actually match what you're running, and (b) inspect a version tweakcc-fixed
hasn't published.

```bash
CCBIN="$(readlink -f "$(command -v claude)")"   # e.g. .../@anthropic-ai/claude-code/bin/claude.exe
npx --yes tweakcc-fixed@latest unpack /tmp/cc.js "$CCBIN"   # writes ~17 MB of JS; reads only, non-destructive
```

You then search that JS for prompt text. **Escaping gotcha:** the minified JS
stores non-ASCII as escapes — em-dash `—` → `—`, and **Latin-1 U+0080–U+00FF
→ `\xHH`** (e.g. `·` → `\xb7`, `×` → `\xd7`). A naive `grep` for a phrase
containing those will miss. To match reliably, search on the longest **pure-ASCII
run** of a piece (no `` ` `` `"` `\` newline), or build an escape-aware regex
(`for each char>127: (literal|\uXXXX|\xHH)`; newlines as `(\n|literal)`). This
`\xHH` case will silently swallow any prompt whose only distinctive text contains one.

---

## Part 4 — Detecting what changed (the MD5 manifest)

`system-prompt-checksums.json` records the MD5 of every **stock** `.md` for the
currently-synced version. It is the project's memory of "what the upstream
prompts looked like last time," so a version bump can answer precisely: which
stock prompts changed, which are new, which are gone.

- **What's hashed:** the full stock `.md` (frontmatter + body). An untouched
  prompt keeps the same `ccVersion` and is byte-identical across CC versions →
  identical MD5; any change to body *or* metadata flips it. (A pure `ccVersion`
  re-stamp with an otherwise-identical body *will* flip the hash — that's a
  conservative false-positive, not a miss. Confirm with a quick `diff`.)
- **It is STOCK hashes, not the un-nerfed files** committed in `system-prompts/`.
  Pointing a hasher at the un-nerfed tree reports the un-nerfs as "changed" — by
  design. This separation is the whole point: `git diff` on the un-nerfed tree
  mixes "Anthropic reworded this" with "my un-nerf is being reverted"; the
  manifest diff shows only Anthropic's changes.
- **Who writes it:** `sync-version.mjs` (automatically, from the stock it holds
  in memory before any un-nerf runs). For the binary-extraction fallback, the
  standalone tool writes it from a stock dir:

```bash
# Diff a stock tree against the manifest (read-only):
node scripts/prompt-checksums.mjs --dir <stock-dir>
# CI gate — exit 1 if a stock tree drifts from the manifest:
node scripts/prompt-checksums.mjs --dir <stock-dir> --check
# (Re)write the manifest for a version:
node scripts/prompt-checksums.mjs --dir <stock-dir> --ccVersion X.Y.Z --write
```

`--dir` must point at **stock** prompts (a tweakcc-fixed extraction or a
`sync-version.mjs --target` output), never the un-nerfed `system-prompts/`.

---

## Part 5 — Reviewing prompts for nerfs

Two passes: the **delta** (what changed this version) and, periodically, a **full
sweep** (catch nerfs missed in prior versions). The manifest narrows the delta to
just CHANGED+ADDED; the full sweep is reproducible via grep-triage.

### Delta review

From the manifest diff (Part 4): for each **CHANGED** file, if it has a rule,
`apply-unnerfs.py` already told you via FAIL whether the rule's target drifted.
If it has no rule, or is ADDED, grep it for brevity signatures and read the hits
in context, then apply the Part-1 decision procedure.

### Full-sweep triage (grep)

```bash
PAT='be (brief|concise|terse)|keep (it|your response) (brief|short|concise)|as (quickly|briefly) as|minimal (explanation|detail|response)|do(n.t| not) (add|over-explain|gold-plate|elaborate)|simplest (approach|solution)|the minimum|[12]-?[0-9]? sentence|no preamble|avoid (verbosity|being verbose)|terse|succinct'
# files that mention brevity but have NO rule (candidate missed nerfs):
comm -23 <(grep -rliE "$PAT" <stock-dir>/*.md | xargs -n1 basename | sort) \
         <(grep -oE '"[^"]+\.md"' scripts/apply-unnerfs.py | tr -d '"' | sort -u)
# then read the matching lines and judge each against Part 1:
grep -inE "$PAT" <stock-dir>/<candidate>.md
```

Most candidates resolve to **keep** (structured output, reference blobs,
functional uses of "minimal"/"short"). Only a real bucket-2/3 directive that
degrades engineering work or human-facing reporting gets a rule. Be conservative
— a false flip is worse than a miss.

For maximum confidence on a big sweep, partition the prompt set by category
(`system-prompt-*`, `agent-prompt-*`, `tool-description-*`, `skill-*` +
`system-reminder-*`, `data-*`, and — under the tweakcc-fixed catalog —
`tool-parameter-*`, `tool-result-*`, `workflow-*`) and review each slice
independently against the Part-1 buckets. `data-*` is almost always all-keep
(reference blobs); `tool-parameter-*` is essentially always all-keep — parameter
descriptions ("concise label", "1-2 sentences") are output-format contracts,
bucket 1 by definition; `workflow-*` script bodies are machine-orchestrated
(schema-parsed agent outputs), also keep.

---

## Part 6 — Updating the rules

Un-nerfs live in `scripts/apply-unnerfs.py` as `Rule(stock, unnerf, description)`
triples keyed by filename. The script finds `stock` and replaces it with `unnerf`
(idempotent: if `unnerf` is already present it SKIPs; if neither is found it
FAILs).

### Adding a rule

```python
"system-prompt-foo.md": [
    Rule(
        stock="<exact stock text, byte-for-byte, incl. ${VARS} and \n>",
        unnerf="<thorough replacement in the project's voice>",
        description="<short scannable label of what it flips>",
    ),
],
```

- `stock` must be **byte-exact**: preserve `${VAR}` interpolations, trailing
  whitespace, and embedded `\n` newlines. Verify with
  `grep -cF "<phrase>" system-prompts/<file>.md` (use a single-line ASCII
  substring; for newline-spanning targets verify in Python:
  `'a\nb' in open(f).read()`).
- Prefer a **short, unique** stock substring over a whole paragraph — it's less
  likely to drift on the next version, and uniqueness-within-the-file is all the
  matcher needs.
- **Quote/escape safety:** an un-nerf containing `"` inside a `${"..."}` literal
  can break things; non-idempotent rules where `unnerf` contains `stock` verbatim
  will re-apply forever — avoid both. Gate with `--check`.
- **Orphan-variable guard (automatic):** `apply-unnerfs.py` refuses any rule
  whose `unnerf` introduces a `${NAME}` identifier that isn't in the rule's own
  `stock` text or the target file's `variables:` frontmatter. Such a placeholder
  has no entry in the prompt's `identifierMap`, so it reaches the binary's
  template literal unresolved and crashes Claude Code at launch
  (`ReferenceError: NAME is not defined`) — or trips tweakcc-fixed's leak guard,
  which silently skips the whole prompt. The guard fails loudly at apply time
  instead. (Lesson imported from lobotomized-claude-code's post-mortems.)

### Handling FAILs (drift) and structural changes

| Situation | Action |
|---|---|
| Upstream **reworded** the passage | Update the rule's `stock` to the new wording (the `unnerf` usually stands). |
| Upstream **removed** the passage/prompt | **Retire** the rule (delete it; note in commit). |
| Upstream moved the passage into a `${VARIABLE}` | **Search the catalog before retiring.** tweakcc-fixed catalogs many variable *values* as their own fragments (often under generated `_VAR_n` names or a `tool-result-*`/`tool-description-*` id) — grep the full stock tree for the passage; if it surfaces as a fragment, **retarget** the rule there. Only retire if the value genuinely isn't catalogued. (Precedent: the "briefly tell the user what you launched" flip, retired in v2.1.196 when the text moved into `${WAIT_FOR_AGENT_RESULTS_INSTRUCTION}`, was restored at the tweakcc-fixed switch — the fork catalogs that value as `tool-description-cloud-agent-launched-result` + `tool-result-cloud-agent-launched-notify-user`.) |
| Upstream **replaced** brevity with neutral/pro-thorough text | Retire the rule — the nerf is gone. |
| A prompt was **renamed** | **Retarget**: move the rule to the new filename key (e.g. `skill-simplify.md` → `agent-prompt-simplify-slash-command.md`). |
| The extractor **re-fragmented** a prompt (tweakcc-fixed splits shared constants and phase bodies into their own fragments) | **Retarget** to the fragment that carries the passage, respelling any `${VARS}` to the fragment's own placeholder names. If the passage now exists in two fragments and one already has a rule flipping it, retire the duplicate rather than double-ruling the same binary text. |

Confirm the same flip isn't needed in a **sibling** prompt — Claude Code often
duplicates a sentence across related prompts, and rules are per-file. Don't
eyeball this — run the **exhaustive sibling audit**: import `RULES`, and for each
rule grep its `stock` across every stock `.md`; any match in a file that *isn't*
the rule's own key is an un-ruled sibling to flip (unless the match is
example/reference content — e.g. a sample prompt quoted inside a guide, which
stays). The current audit (over the full 1,331-file tweakcc-fixed catalog) finds
**0 un-ruled siblings**: every cross-file `stock` match is already ruled in both
files, except the intentional `skill-model-migration-guide` keep — that phrase
sits inside a sample prompt quoted for users (example content, not a directive
to Claude). See Part 9.

---

## Part 7 — Verifying against the installed binary

The manifest/`apply-unnerfs` loop proves the rules apply to the *JSON-derived*
stock. To prove the prompts match what you're actually **running** (and to catch
a patch release that changed prompts the published JSON doesn't yet cover):

```bash
CCBIN="$(readlink -f "$(command -v claude)")"
npx --yes tweakcc-fixed@latest unpack /tmp/cc.js "$CCBIN"
# for each prompt, check its longest pure-ASCII piece is present in /tmp/cc.js
# (see scripts usage / Part 3 escaping note). Near-total presence => essentially
# identical; the only expected misses are micro-prompts that are pure ${interpolation}
# with no static text long enough to fingerprint (nothing to mismatch).
```

To verify an **applied** un-nerf actually reached the binary (after
`tweakcc-fixed --apply`), unpack the *patched* binary and grep for un-nerf
sentinels present and stock sentinels gone:

```bash
# un-nerf present (expect >0):
grep -c "senior-engineer standard" /tmp/cc.js
grep -c "never trade away rigor, depth, or correctness" /tmp/cc.js
grep -c "Make your review thorough and complete" /tmp/cc.js
# stock gone (expect 0):
grep -c "introduce abstractions beyond what the task requires" /tmp/cc.js
```

`install.sh` automates exactly this and **fails loudly (leaving the binary clean)
on a no-op/partial apply** — never trust tweakcc-fixed's "applied successfully"
message alone; it can report success while patching nothing.

**Two benign-noise traps when re-applying** (both look like failures but aren't):

- **"Could not find system prompt …" ×dozens** — you ran `tweakcc-fixed --apply`
  against an **already-un-nerfed** binary, so it hunts for the *stock* text that
  the prior patch already replaced and can't find it. The un-nerf is fine; the
  apply is just a redundant no-op. `install.sh` avoids this by reinstalling a
  clean **stock** binary before every re-apply (it detects a prior un-nerf via
  [[the sentinels]] and `npm install -g @anthropic-ai/claude-code@<ver>`
  overwrites the patched binary). Proof: from a pristine binary the flood is 0
  warnings; from a patched one it's dozens.
- **"Customizations applied with some failures / open an issue"** — a bare
  `--apply` also runs tweakcc-fixed's *other* feature patches from your
  `~/.tweakcc/config.json` (themes, session memory, model customizations, …). On
  a very fresh CC build some of those can't be located. That is
  **tweakcc-fixed's** to fix and is unrelated to the un-nerf — it prints "these
  do not affect your system prompt patches." `install.sh` verifies the un-nerf
  independently (sentinels) and says so.

---

## Part 8 — tweakcc-fixed operational reference

This project targets [skrabe/tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed),
a strict-superset fork of [Piebald-AI/tweakcc](https://github.com/Piebald-AI/tweakcc).
What the fork adds that this project relies on:

- **~2.5× prompt coverage** (1,437 sites / 1,331 unique ids vs 540 upstream for
  v2.1.198): per-turn fragments, interpolated-variable values, compact tool-
  description variants, MCP instruction blocks. This is what made the Part-9
  restorations possible.
- **Native-install overrides** — upstream gates system-prompt overrides off for
  native (Bun-compiled) installs; the fork applies them.
- **npm package `tweakcc-fixed`** (≥ 2.0.0 — versions ≤ 1.0.5 are an unrelated,
  unmaintained earlier fork). Prompt data is fetched from the fork's repo at
  runtime, so a new CC release works as soon as its JSON lands on `main`.
- **Its own feature patches, some DEFAULT-ON.** Two default-on patches change
  model-facing behavior beyond prompts: `dream-mode` (memory consolidation +
  `/dream`) and `claudemd-context-once-per-conversation` (rewrites how CLAUDE.md
  reaches the model). `install.sh` seeds `settings.misc.enableDreamMode` and
  `settings.misc.claudemdContextOncePerConversation` to `false` in
  `~/.tweakcc/config.json` (only when the keys are absent — an explicit user
  choice is never overridden) so unnerfcc stays prompts-only.
- **A `system-reminders/` override surface** (`~/.tweakcc/system-reminders/`) for
  per-turn injections that never surface as named prompts, plus `shadows:`
  frontmatter and empty-body suppression in overrides. unnerfcc doesn't use any
  of these (we flip, never cut), but you'll meet them reading fork behavior; the
  system-reminder registry is a surface this project has **not yet audited** for
  nerfs.

### Commands (confirmed)

| Command | What it does |
|---|---|
| `tweakcc-fixed --apply` (bare) | **THE** system-prompt apply path. Patches every prompt whose `~/.tweakcc/system-prompts/*.md` differs from stock. Self-downloads `prompts-X.Y.Z.json`, self-creates `native-binary.backup`. Also runs the fork's own feature patches per `~/.tweakcc/config.json` (see default-on note above). |
| `tweakcc-fixed --apply --patches <ids>` | **NOT** for prompts — selects UI/theme/feature patches. Applies **zero** `.md` edits. Do not use it to apply un-nerfs. |
| `tweakcc-fixed unpack <out.js> <bin>` | Extract bundled JS from a binary (read-only, version-independent). The inspection/verify workhorse. |
| `tweakcc-fixed repack <in.js> <bin>` | Re-embed JS (as Bun bytecode; size balloons). |
| `tweakcc-fixed --restore` / `--revert` | Restore the binary from `native-binary.backup`. |
| `tweakcc-fixed --list-system-prompts [ver]` | List prompts known for a version. |

The interactive TUI extracts the full `.md` set from the binary, but **cannot be
scripted** (no TTY → the React app crashes; no non-interactive extraction flag).
Use `sync-version.mjs` (JSON) or `unpack` instead.

### The publish lag (the common blocker)

Both `sync-version.mjs --download` and `tweakcc-fixed --apply` need
`prompts-X.Y.Z.json`, which lags a fresh CC release by hours-to-days. When it's
missing (404):

- **Preferred: wait for the latest version's JSON.** Since we target only the
  latest, the simplest correct move is to re-run the happy path once
  `prompts-X.Y.Z.json` for your installed version publishes (usually within a day).
  (The fork's `showtime` skill is its own upgrade pipeline — new-version JSONs
  land on its `main` when that runs; watch the repo if you're blocked.)
- **Stopgap only if you must ship now:** sync to the newest *published* version ≤
  installed and verify against the binary (Part 7). Treat it as temporary — re-sync
  to the latest as soon as its JSON is up; the manifest will flag whatever the
  interim version missed. Don't carry the interim version as a tracked target.
- **Applying to the binary must wait** for the matching JSON (tweakcc-fixed can't
  locate prompts without it). Build tweakcc-fixed from `main` to get the freshest
  CC support (`install.sh` does this by default); `main` carries
  prompt-locator/repack fixes before they're cut into an npm release.

### `~/.tweakcc/` layout — what to clear

`config.json` (settings + `ccVersion`), `system-prompts/*.md`,
`prompt-data-cache/prompts-X.Y.Z.json`, `systemPromptOriginalHashes.json`,
`systemPromptAppliedHashes.json`, `native-binary.backup` (~400 MB), and
`native-claudejs-{orig,patched}.js`.

A **stale** older-version state shadows new prompts. `install.sh` clears it for
you before staging — preserving `config.json` and **deleting** the rest,
including the ~400 MB `native-binary.backup` and the `native-claudejs` dumps.
This project keeps **no backups**: stock is always re-extractable and rollback is
a Claude Code reinstall, not `--restore`. By hand:

```bash
cd ~/.tweakcc || exit
for f in system-prompts prompt-data-cache systemPromptOriginalHashes.json \
         systemPromptAppliedHashes.json native-binary.backup \
         native-claudejs-orig.js native-claudejs-patched.js .unnerf-stale-*; do
  rm -rf "$f"
done
```

tweakcc-fixed won't overwrite an *edited* `.md`, so a clean extraction needs the
`system-prompts/` dir cleared first.

### Dead ends (don't repeat)

- `--apply --patches <ids>` to apply prompts → applies nothing.
- `adhoc-patch` for bulk prompt edits → matches raw bytes only, breaks on any
  escaped char.
- Trusting tweakcc-fixed's "applied" message → always `unpack`+grep to verify.
- The npm package `tweakcc-fixed` at versions ≤ 1.0.5 → a different, unmaintained
  fork. Use ≥ 2.0.0, or build from `main` (what `install.sh` does).
- (Historical, base-tool era:) a tweakcc older than `main` / 4.1.1 → mis-located
  Latin-1 prompts and aborted the repack on a fresh CC build.

---

## Part 9 — Current state (v2.1.199)

We track **only the latest** Claude Code version whose prompt JSON tweakcc-fixed
has published. Replace this snapshot each sync rather than appending history.

- **Version:** built from **v2.1.199** — the latest CC release — using the
  **skrabe/tweakcc-fixed catalog** (1,483 sites / **1,372 unique prompts** —
  duplicate-id sites collapse to their first occurrence, matching the fork's own
  extractor).
- **Scale:** **81 un-nerf rules across 64 files**, 1,372 prompts, `--check`
  clean, orphan-variable guard passing. **No new rules this sync; no rule drift.**
- **Upstream delta (v2.1.198 → v2.1.199):** the manifest diff over-reports
  "changed" because it fingerprints the full `.md` including frontmatter, and
  Anthropic populated a real `ccVersion` on many prompts (the fork's v2.1.198
  extraction carried `ccVersion: null`), so a `null → 2.1.199` frontmatter bump
  alone flags a file. Filtering to real body changes: **+43 added, −2 removed,
  19 modified with a genuine body diff** (the rest are ccVersion-only). This was
  a **feature build-out**, not a posture change — Cowork onboarding, Claude
  Design, and plugin/skill/connector marketplace tooling.
  - **Added (43):** all bucket-1 keeps — `skill-setup-cowork*` (UI onboarding
    flow: "two or three sentences plus the card" is UX-driven, flipping it would
    wall-of-text the onboarding), `tool-description-*`/`tool-parameter-*` for the
    new list/search/suggest tools (functional), `tool-result-*` status/error
    messages (structured), `system-prompt-design-command-consent-revoke-row`
    (a refusal-policy table row, not brevity). No brevity-signature directive on
    engineering depth or human-facing reporting anywhere in the set.
  - **Removed (2):** `system-prompt-local-command-stdout-framing-tag-4` and
    `tool-parameter-projects-force` — neither carried an un-nerf rule, so nothing
    to retire.
  - **Modified (19 real-body):** all variable renames (e.g.
    `SYSTEM_PROMPT_MEMORY_INSTRUCTIONS_VAR_4` →
    `HAS_PROJECT_SKILL_UPKEEP_INSTRUCTIONS_FN`), functional token changes
    (`[FILE_OVER_5MB]` → `[FILE_TOO_LARGE]`, added findings `category` field,
    PowerShell tool-name remaps), a consent/coordination reword, or upstream
    **adding** thoroughness (`skill-artifact-design` and
    `tool-description-artifacttool-2` both gained a "design both themes" pro-thorough
    paragraph — kept as-is). **No new bucket-2/3 nerf, no weakened bucket-4.**
- **Drift check:** all 81 rules re-applied byte-exactly (`Rules applied: 81,
  FAILED: 0, Missing: 0`) — 8 rule-carrying files were in the manifest "changed"
  list, but for every one the change was a ccVersion bump or edits outside the
  un-nerfed passage; no rule's `stock` anchor moved.
- **Carry-forward state (from the tweakcc-fixed switch, still true):**
  `system-prompt-current-claude-models` remains present in the fork catalog (no
  hand-restoration needed), and the two "briefly tell the user what you launched"
  launch-note flips (`tool-description-cloud-agent-launched-result`,
  `tool-result-cloud-agent-launched-notify-user`) remain reachable and applied.
- **Binary check (Part 7):** not re-run this sync (no patchable binary in the
  sync environment). The fork catalog is a superset extracted from the same
  binary version, and `install.sh` verifies sentinels land on every install.
  Re-run the full fingerprint check at the next version bump.
- **Not yet audited:** tweakcc-fixed's `system-reminders/` registry (per-turn
  injections that never surface as named prompts) — a future sweep surface, see
  Part 8.
