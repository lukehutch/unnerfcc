# The un-nerf guide — objectives

This is the single source of truth for **what this project is trying to do** —
the un-nerf policy: which prompt restrictions to lift, which to keep, and why.
**Part 1 is the load-bearing part** and is current. Read it before adding or
changing any un-nerf rule.

> [!NOTE]
> The **upgrade/sync workflow** now lives in [UPGRADE.md](UPGRADE.md) — unnerfcc
> is standalone (its own `lib/` toolkit, SHA-256 Claude classification, no
> tweakcc dependency). The later parts of this guide (the tweakcc-based sync
> playbook, Parts 2 / 7–9) predate that rewrite and are being superseded by
> UPGRADE.md; treat Part 1 (the policy) as authoritative and UPGRADE.md as the
> workflow.

> Companion docs: [README](README.md) (what/why for users) · [UPGRADE](UPGRADE.md)
> (the release workflow) · [MAINTENANCE](MAINTENANCE.md) (script flags) ·
> [BACKGROUND](BACKGROUND.md) (how it works).

---

## Part 1 — The objective

Claude Code's stock prompts lean hard on **holding back** — be brief, do the
minimum, investigate only as far as needed, flag and hedge, refuse anything that
pattern-matches a risk. This project **lifts those leashes**. The goal is a tool
that works to its **full capability** by default: thorough where depth helps, and
**unrestricted on legitimate work**.

> **One direction, always: lift restrictions; never add them.** Every rule either
> removes a cap or turns a "hold back" into "go as far as the work needs." A
> change that would *impose* a new constraint is out of scope, even if it looks
> tidier.

The restrictions worth lifting fall into these groups:

| # | Group | What it caps | Action |
|---|-------|--------------|--------|
| 1 | **Length / chat brevity** | how much Claude tells the user ("2-3 sentences", "keep it short") | **LIFT** — say as much as the task warrants; length is the user's call, not the prompt's |
| 2 | **Implementation brevity** | the code Claude writes ("simplest approach", "don't add abstractions", "do the minimum") | **LIFT** — implement to a senior standard |
| 3 | **Process brevity** | how Claude investigates and reports ("as quickly as possible", "2-sentence summary") | **LIFT** — investigate and report as thoroughly as the work deserves |
| 4 | **Local flags / refusals** | content-flagging, refusals, and alarms that run in the *local* prompt (suspected-injection alarms, "refuse anything resembling X", self-hedging about Claude's own responses, anti-malicious reminders) | **LIFT** — see the guardrail policy below |
| 5 | **Thoroughness directives** | "think step by step", "check your work" | **AMPLIFY** where weakened |

> **No numeric output limits.** A prompt that caps *how many* items CC may report
> — "at most 8 findings", "≤4", "up to 6 candidates", or a `${MAX_FINDINGS}`
> interpolation that injects the ceiling — is a Group-1/3 brevity cap wearing a
> number. **LIFT it: let CC report every relevant, potentially-valuable finding,
> ranked most-severe first, with no numeric ceiling.** A real finding CC drops to
> hit a quota is exactly the failure this project exists to prevent. Keep only the
> *ordering* and genuine parse contracts (a fixed-length enum, an array a script
> indexes by position) — never a bound on the count of substantive results. When
> the cap is injected by a `${VAR}` (e.g. `${MAX_FINDINGS}`), removing the `${VAR}`
> reference is the lift — see register rule 6 and Part 6.

### Guardrail policy — lift local restrictions, rely on server-side enforcement

Claude Code's content-flagging and refusal instructions are **local**: they live
in the system prompt that runs on the *user's own machine*. They are **not** the
layer that enforces safety. Anthropic's models refuse genuinely harmful requests
as a matter of **server-side and trained-in** behavior on every API call,
regardless of what any local system prompt says. Removing a local guardrail line
therefore **cannot** disable that enforcement — this repo only edits local prompt
text; the real gate is untouched. (This is also why removing these lines does not
enable malicious use: the model still refuses genuinely harmful work server-side.)

What the local lines *do* add is a redundant extra filtering layer with a **high
false-positive rate**: they interrupt legitimate security research, ordinary code
work, and benign requests to raise alarms or refuse, far more often than they
catch anything the server-side layer would miss. On the user's own machine a local
"refuse X" reminder is **security theater** — the enforcing gate is elsewhere, and
the local echo mostly generates noise.

So this project lifts local content-flagging, refusals, and anti-malicious
reminders, and relies on server-side guardrails for anything concerning harm to
*third parties*. Not to enable malicious use (that behavior is server-side and
unaffected) — to stop the local layer from second-guessing legitimate work.

**One class stays, and it is the *only* thing protected locally:** unintended harm
to the **user**, caused by the agent itself being hijacked or misfiring.
Concretely — accidental prompt injection from spawned agents, skills, tool
results, or file content; unintended damage to the local filesystem; hijacking of
the user's accounts; and exfiltration of the user's data the user did not
explicitly request. Server-side guardrails do **not** cover this: nothing on
Anthropic's side stops a hijacked *local* agent from following injected
instructions to delete files, take over an account, or leak data. These checks
have negligible false-positive cost and real protective value, so they are
**kept** — and if a stock prompt in this class is itself too weak, strengthen it.
Rules in `apply-unnerfs.py` never weaken this class.

### The keep/lift decision procedure

When a prompt contains a brevity- or restriction-signature phrase, decide with
this checklist (first match wins):

1. **Does removing it break tool mechanics or machine parsing?** A character cap
   on a value that gets *truncated* downstream, "minimal `old_string` for
   uniqueness" (excess context makes Edit fail), a status string a script parses,
   "no preamble before the *required* tool call". → **KEEP.** The constraint does
   real mechanical work, not depth-nerfing. (A length cap on a JSON *string field*
   does **not** break parsing — JSON strings take any length — so those LIFT.)
2. **Is it reference / documentation / example content?** Every `data-*.md` blob,
   API docs, sample prompts quoted inside a guide, a length cap *inside an
   example*. → **KEEP.** Not a directive to Claude.
3. **Does it protect the *user* from their own hijacked or misfiring agent?**
   accidental injection from spawned agents/skills/tool-results/content,
   unintended local-filesystem damage, account hijacking, unrequested data
   exfiltration, confirm-before-irreversible/outward. → **KEEP** (strengthen if
   weak). Server-side doesn't cover this; it is the only class protected locally.
4. **Otherwise** — any length cap, implementation/process brevity directive,
   content flag, refusal, or alarm on legitimate work → **LIFT.**

Subagent prompts still need care: a report **consumed by a human or an
orchestrating agent** should be thorough (lift), but output **parsed by a workflow
script** stays terse (keep, per #1). Same word, opposite call — decide by *who
consumes the output*.

When you lift, write the replacement in the project's voice: lead with the
*requirement*, not the prohibition; preserve any genuinely-good clause already
present ("never half-finished"); keep it about **capability and depth**, never
about padding word count — and follow the register rules below to the letter.

### Writing the rule — register rules

**The prompt language you write must itself be brief, clear, imperative, and
active — not verbose passive prose.** This is about the *instruction text*, not
about Claude's output: a rule tells Claude to be thorough and uncapped, but it
says so in as few plain imperative words as carry the requirement. A terse
active directive lands harder and costs fewer tokens on every turn than a padded
one; an over-long rule also dilutes the prompt it lives in. Current Claude models
follow plain directives more literally and overcorrect on rhetorical pressure,
so verbosity here is actively counterproductive. These rules distill Anthropic's
prompting guidance plus field lessons from
[lobotomized-claude-code](https://github.com/skrabe/lobotomized-claude-code)
(the opposite project: it cuts prompts down per-model, and documents what newer
models do badly under). Apply them to **every** `unnerf` string — existing rules
included; the audit re-checks them:

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
6. **Never *introduce* a `${VAR}` the prompt doesn't already have — but
   *removing* one is fine, and often the point.** Introducing a placeholder
   outside the prompt's `identifierMap` crashes Claude Code at launch
   (`ReferenceError`); `apply-unnerfs.py` enforces this automatically (the
   orphan-variable guard, Part 6) — don't fight it. The guard is
   **one-directional**: it only stops you *adding* an undefined placeholder.
   *Dropping* a `${VAR}` reference is safe and often the whole point of the lift
   when that variable's only job is to cap verbosity, effort, or output count —
   e.g. a `${MAX_FINDINGS}` that limits how many findings CC may report. Cut the
   reference and the cap goes with it. Repack is name-based (Part 3: the body is
   reconstructed by interleaving `pieces` with named `identifierMap`
   placeholders), so the now-unused `variables:` frontmatter entry becomes a
   harmless orphan — the interpolation simply drops out of the rebuilt template.
   Leave the frontmatter line as-is; it is inert, and stripping it is cosmetic
   (stock re-extraction reintroduces it each sync anyway).

---

## Part 2 — The upgrade workflow

The workflow is now **[`./upgrade.sh`](upgrade.sh)** — fully standalone, no
tweakcc, no waiting on anyone to publish a catalog. The full playbook (what each
step does, the Claude classification of new strings, the review beats, the
Bun-format-change path) lives in **[UPGRADE.md](UPGRADE.md)**. In brief:

```bash
./upgrade.sh          # detect new CC → unpack → classify new strings (Opus,
                      # cached) → generate catalog → replay un-nerfs → verify boots
python3 scripts/apply-unnerfs.py --check   # gate: 0 FAILED, 0 missing
```

Classification of new strings runs on **Opus** (the one-time bootstrap over the
whole bundle used Haiku; incremental per-release runs use Opus for un-nerf
recall). For each new prompt Claude proposes a `name` + `description` and a
per-`${…}`-slot binding audit — a pre-labeled worklist surfaced in
`<catalog>.candidates.json`, which the maintainer confirms before promoting into
the catalog with a real id.

Then the maintainer's judgment step (this guide's reason to exist): for each
prompt Claude flags as un-nerf-worthy (`data/unnerf-candidates.json`) or that
drifted (`apply-unnerfs.py --check` FAILs), make the keep/flip call **per Part 1**
and update the rules in `scripts/apply-unnerfs.py` (Part 6). Commit the catalog,
`system-prompts/`, the SHA-256 manifest, and any rule changes together.

---

## Part 3 — Reading the prompts (where stock text comes from)

Claude Code ships as a compiled Bun **native binary** with its prompts baked in
as string literals. There are two ways to get the stock text:

### A. Our own catalog (`data/prompts/prompts-X.Y.Z.json`)

`upgrade.sh` generates this from the installed binary (via `scripts/gen-catalog.mjs`)
— **we own it**, no download. Each prompt is `{ id, name, description, version,
pieces[], identifiers[], identifierMap }`. The `.md` body is reconstructed by
interleaving `pieces` with `${HUMAN_NAME}` placeholders from `identifierMap`;
frontmatter is `name`, `description`, `ccVersion` (the version when *that prompt*
last changed — **not** the global CC version), and `variables`.
`scripts/sync-version.mjs` does the reconstruction. Two things to know:

- **Duplicate ids.** Some prompt ids appear at multiple binary sites (one entry
  per site, usually byte-identical); file counts are unique-id counts.
- **Generated variable names.** Slots without an editorial name carry
  machine-generated placeholders (`${<PROMPT_ID>_VAR_0}`, …). Rules that target
  such a fragment must spell the placeholder exactly as extracted.

### B. The installed binary, via `lib/bun-binary.mjs unpack` (ground truth)

Extract the bundled JS from any installed binary directly — to inspect a prompt
or confirm a rule's `stock` text still matches what you're running:

```bash
CCBIN="$(readlink -f "$(command -v claude)")"   # e.g. .../@anthropic-ai/claude-code/bin/claude.exe
node lib/bun-binary.mjs unpack "$CCBIN" /tmp/cc.js   # writes ~18 MB of JS; read-only, non-destructive
```

You then search that JS for prompt text. **Escaping gotcha:** the minified JS
stores non-ASCII as escapes — em-dash `—` → `—`, and **Latin-1 U+0080–U+00FF
→ `\xHH`** (e.g. `·` → `\xb7`, `×` → `\xd7`). A naive `grep` for a phrase
containing those will miss. To match reliably, search on the longest **pure-ASCII
run** of a piece (no `` ` `` `"` `\` newline), or build an escape-aware regex
(`for each char>127: (literal|\uXXXX|\xHH)`; newlines as `(\n|literal)`). This
`\xHH` case will silently swallow any prompt whose only distinctive text contains one.

---

## Part 4 — Detecting what changed (the SHA-256 manifest)

`system-prompt-checksums.json` records the SHA-256 of every **stock** `.md` for the
currently-synced version. It is the project's memory of "what the upstream
prompts looked like last time," so a version bump can answer precisely: which
stock prompts changed, which are new, which are gone.

- **What's hashed:** the full stock `.md` (frontmatter + body). An untouched
  prompt keeps the same `ccVersion` and is byte-identical across CC versions →
  identical SHA-256; any change to body *or* metadata flips it. (A pure `ccVersion`
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

`--dir` must point at **stock** prompts (a `sync-version.mjs --target` or
`gen-catalog.mjs` output), never the un-nerfed `system-prompts/`.

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
`system-reminder-*`, `data-*`, `tool-parameter-*`, `tool-result-*`,
`workflow-*`) and review each slice
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
  (`ReferenceError: NAME is not defined`) — or trips the splicer's leak guard
  (`lib/patch-prompts.mjs`), which skips the prompt. The guard fails loudly at apply time
  instead. (Lesson imported from lobotomized-claude-code's post-mortems.)
  The guard is **one-directional** — it never objects to a rule that *removes* a
  `${VAR}` reference. Dropping a verbosity/effort/count-cap variable (e.g.
  `${MAX_FINDINGS}`) is a valid, encouraged un-nerf: repack is name-based, so the
  orphaned `variables:` frontmatter entry is inert (the interpolation drops out of
  the rebuilt template). Don't add a rule to strip the frontmatter line — it's
  cosmetic, and stock re-extraction reintroduces it each sync anyway.

### Handling FAILs (drift) and structural changes

| Situation | Action |
|---|---|
| Upstream **reworded** the passage | Update the rule's `stock` to the new wording (the `unnerf` usually stands). |
| Upstream **removed** the passage/prompt | **Retire** the rule (delete it; note in commit). |
| Upstream moved the passage into a `${VARIABLE}` | **Search the catalog before retiring.** Our extractor catalogs many variable *values* as their own fragments (often under generated `_VAR_n` names or a `tool-result-*`/`tool-description-*` id) — grep the full stock tree for the passage; if it surfaces as a fragment, **retarget** the rule there. Only retire if the value genuinely isn't catalogued. (Precedent: the "briefly tell the user what you launched" flip, retired in v2.1.196 when the text moved into `${WAIT_FOR_AGENT_RESULTS_INSTRUCTION}`, was restored once the value was catalogued as `tool-description-cloud-agent-launched-result` + `tool-result-cloud-agent-launched-notify-user`.) |
| Upstream **replaced** brevity with neutral/pro-thorough text | Retire the rule — the nerf is gone. |
| A prompt was **renamed** | **Retarget**: move the rule to the new filename key (e.g. `skill-simplify.md` → `agent-prompt-simplify-slash-command.md`). |
| The extractor **re-fragmented** a prompt (our extractor splits shared constants and phase bodies into their own fragments) | **Retarget** to the fragment that carries the passage, respelling any `${VARS}` to the fragment's own placeholder names. If the passage now exists in two fragments and one already has a rule flipping it, retire the duplicate rather than double-ruling the same binary text. |

Confirm the same flip isn't needed in a **sibling** prompt — Claude Code often
duplicates a sentence across related prompts, and rules are per-file. Don't
eyeball this — run the **exhaustive sibling audit**: import `RULES`, and for each
rule grep its `stock` across every stock `.md`; any match in a file that *isn't*
the rule's own key is an un-ruled sibling to flip (unless the match is
example/reference content — e.g. a sample prompt quoted inside a guide, which
stays). The current audit (over the full 1,388-file catalog) finds
**0 un-ruled siblings**: every cross-file `stock` match is already ruled in both
files. One non-obvious sibling this covers is the plan-specificity cap in
`system-prompt-remote-planning-session` (the same nerf `ultraplan` flips), which
has its own rule. The only remaining cross-file matches are the intentional
`skill-model-migration-guide` keeps: two directive sentences (`act-when-ready`,
`no-unnecessary-error-handling`) that sit inside `>` blockquotes quoting *other*
prompts as reference material, not as directives to Claude. See Part 9.

---

## Part 7 — Verifying against the installed binary

The manifest/`apply-unnerfs` loop proves the rules apply to the *JSON-derived*
stock. To prove the prompts match what you're actually **running** (and to catch
a patch release that changed prompts the published JSON doesn't yet cover):

```bash
CCBIN="$(readlink -f "$(command -v claude)")"
node lib/bun-binary.mjs unpack "$CCBIN" /tmp/cc.js
# for each prompt, check its longest pure-ASCII piece is present in /tmp/cc.js
# (see scripts usage / Part 3 escaping note). Near-total presence => essentially
# identical; the only expected misses are micro-prompts that are pure ${interpolation}
# with no static text long enough to fingerprint (nothing to mismatch).
```

To verify an **applied** un-nerf actually reached the binary (after
`./install.sh` / `node lib/patch-prompts.mjs`), unpack the *patched* binary and
grep for un-nerf sentinels present and stock sentinels gone:

```bash
# un-nerf present (expect >0):
grep -c "senior-engineer standard" /tmp/cc.js
grep -c "never trade away rigor, depth, or correctness" /tmp/cc.js
grep -c "Make your review thorough and complete" /tmp/cc.js
# stock gone (expect 0):
grep -c "introduce abstractions beyond what the task requires" /tmp/cc.js
```

`install.sh` automates exactly this and **fails loudly (leaving the binary clean)
on a no-op/partial apply** — it verifies the 5 sentinels independently rather than
trusting the splice's own summary, and the splicer's own LOST banner + exit 3
(below) is the primary guard against a silent no-op.

**The vendored splicer classifies its own skips by severity** (`lib/patch-prompts.mjs`).
When a prompt can't be uniquely located (couldNotFind / several matches, none a
standalone string literal / two prompts resolving to overlapping bundle regions),
the splicer compares the edited `.md` against stock (reconstructed from the catalog
`pieces`):

- **`[info] N stock prompt(s) not re-spliced … (harmless)`** — the `.md` equals
  stock, so we weren't changing it; leaving the bundle untouched is a correct no-op.
  These are the ~60 memory/tool-result/LSP micro-prompts we don't un-nerf. Ignore them.
- **`[LOST] <id>` banner + exit 3** — the `.md` *differs* from stock (a real un-nerf)
  but never reached the bundle. This is a genuine failure: the un-nerf is MISSING
  from the patched binary. `install.sh` warns and ships the rest; `upgrade.sh` treats
  it as a **release blocker** (`die`). Fix the catalog `pieces` or the rule anchor,
  then re-run.
- **`[info] input bundle is ALREADY un-nerfed …`** — you ran the splice against a
  binary a prior run already patched (detected via the un-nerf sentinels in the
  *input*, before splicing). Every un-nerf's stock anchor is gone, so they all
  couldNotFind — expected, **not** lost (exit 0). Reinstall stock CC first for a
  clean apply. This global check is why a genuine single drop against a stock binary
  still reports LOST while a wholesale patched-re-run doesn't false-alarm.

**The splicer is AST-based and encoding-agnostic.** It parses the bundle with
`@babel/parser` and locates each prompt by matching string-producing AST nodes on
their DECODED content (quotes/escapes stripped, per-build identifier names excised,
`+`-concatenation folded) — never a regex over the raw text. So a prompt is found by
*what it says*, not how it's spelled: single- or double-quoted literal, backtick
template with `${…}`, or a **pure-string `+`-concat run** (any quote mix, folded to
one contiguous string) all resolve to the same content key, and **every** matching
node is patched. A `+` run *separated by a variable* (`"a"+x+"b"`) is deliberately
NOT folded — those interpolate a runtime value (in this bundle, overwhelmingly
library/error strings), not authored prompt text — so its parts stay separate; a
genuine prompt with a slot is authored as a single template literal. That's how "all call-sites are patched, not just
the first" and "duplicates broken up differently are still found" both fall out for
free — the run summary's `dupSites` counts the extra sites and an `[info] patched N
additional call-site(s)…` line names them. The *catalog* collapses duplicate-id sites
to their first occurrence at extraction time (Part 9), but the splicer patches every
site of a reused constant regardless. (A sentence embedded inside a *larger* prompt is
a separate node/prompt with its own id — patched by its own rule, and the overlap
guard keeps the outer node when two matched nodes nest.) The shared node→`pieces`
logic lives in `extract-prompts.mjs`, so the extractor and patcher agree exactly.

> **Lesson (the `agent-prompt-general-purpose-short` drop).** In 2.1.201 the short
> ~225c agent self-description is the standalone constant `BCa` (`"You are…half-done.
> When you complete… essentials."`), used as the general-purpose agent's *fallback*
> system prompt. The catalog's `pieces` for it were stale — the short-only sentence,
> which no longer exists standalone; it only appears **inlined** (`${"…"}`) inside the
> long general-purpose prompt. So the splicer resolved short *into* the long prompt's
> region and the overlap guard silently dropped it, leaving `BCa` un-un-nerfed. Fix:
> correct the catalog `pieces` to the **full** `BCa` string (so it matches `BCa`
> uniquely and not the inlined copy), and flip both sentences (completeness + report
> tail) to match the sibling long prompt. The severity split above exists so this
> class of silent drop can never hide among the benign skips again.

---

## Part 8 — (removed)

This project no longer uses the tweakcc-fixed tool. Extract/patch/re-package the
binary is our own `lib/` toolkit (`node lib/bun-binary.mjs unpack|repack`,
`node lib/patch-prompts.mjs`); the whole flow is `./install.sh` / `./upgrade.sh`
([UPGRADE.md](UPGRADE.md)). tweakcc-fixed remains a reference if Bun's binary
format changes ([BACKGROUND.md](BACKGROUND.md)).

## Part 9 — Current state (v2.1.202)

We track **only the latest** Claude Code version, generating the prompt catalog
ourselves from the installed binary each sync (`gen-catalog.mjs`). Replace this
snapshot each sync rather than appending history.

- **Version:** built from **v2.1.202** — the latest CC release (1,500 sites /
  **1,388 unique prompts** — duplicate-id sites collapse to their first
  occurrence in our own `gen-catalog.mjs` extractor; note the *splicer* still
  patches every identical call-site of a reused prompt, see Part 7).
- **Scale:** **123 un-nerf rules across 79 files**, 1,388 prompts, `--check`
  clean, orphan-variable guard passing. All **123 rules re-apply byte-exactly**
  (`Rules applied: 123, FAILED: 0, Missing: 0`; `--check` → `123 skipped, 0
  FAILED, 0 missing`), and all 5 install.sh verify sentinels are present. The
  un-nerfs touch only the brevity/thoroughness posture (engineering depth and
  human-facing reporting); no protection-class or functional string is flipped.
- **Sibling audit:** over the full 1,388-prompt catalog, **0 un-ruled siblings**
  — every cross-file `stock` match is already ruled in both files (Part 6). The
  only remaining cross-file matches are intentional stock keeps in
  `skill-model-migration-guide`: two directive sentences (`act-when-ready`,
  `no-unnecessary-error-handling`) quoted inside `>` blockquotes as reference
  material, not directives to Claude.
- **Intentional stock keeps (with reason):**
  `agent-prompt-auto-mode-setup-slash-command`'s "at most ~15 names per category;
  prefer patterns over full enumeration" — a security-recon sub-agent building a
  *pattern-based* config, where a `*-prod` glob is strictly more complete than an
  enumeration, so the cap suppresses no coverage (paired with "no file contents"
  data-minimization); and `skill-verify`'s "keep it short" — applies only to the
  reusable cheatsheet it persists, while the skill's actual verification guidance
  stays maximally thorough. Both are bucket-1 keeps (Part 1).
- **Carry-forward state:** `system-prompt-current-claude-models` is present in
  our catalog (no hand-restoration needed), and the two "briefly tell the user
  what you launched" launch-note flips
  (`tool-description-cloud-agent-launched-result`,
  `tool-result-cloud-agent-launched-notify-user`) remain reachable and applied.
- **Binary check (Part 7):** our catalog is extracted from the installed v2.1.202
  binary, and `install.sh` verifies the un-nerf sentinels land on every install.
- **Not yet audited:** the `system-reminder-*` per-turn injections that never
  surface as named prompts — a future full-sweep surface (Part 5).

---

## Part 10 — Effort un-nerfs (lifting silent effort degradation)

Beyond prompt text, CC degrades reasoning **effort in code**. unnerfcc's charter:
**never let effort be silently degraded.** These are handled by
[`lib/apply-code-patches.mjs`](lib/apply-code-patches.mjs) — a **best-effort,
second-tier** pass that edits CC's own code/data strings (not prompts) on the
already-prompt-patched bundle. It **can never block the prompt un-nerfs**:
`install.sh` / `upgrade.sh` run it after the prompt patch, and any failure is
reported while the prompt un-nerfs ship regardless.

**The nerfs (confirmed in v2.1.202 by reading the bundle):**
- **Mid-tier model default.** Effort resolves from a data field `default_effort`
  per model in the catalog; the resolver is `…?.default_effort??"high"`. In
  v2.1.202 the catalog carries **four** `default_effort` sites: **Fable 5**,
  **Opus 4.8** and **Sonnet 5** all ship `"high"` (the *middle* of
  `["low","medium","high","xhigh","max"]`); **Opus 4.7** ships `"xhigh"`. Every
  one of these models also carries the `max_effort` capability, so none of them
  actually needs to sit below `max` — the default is a deliberate throttle.
- **`/effort` capped below `max`.** The persisted-setting enum is
  `["low","medium","high","xhigh"]` (no `max`) and the write validator rejects
  `"max"`; `max` is reachable only via `CLAUDE_CODE_EFFORT_LEVEL` env or transient
  modes. A user cannot persist the model's top tier.
- **Launch-effort pin.** On a fresh Opus/Fable session the resolver returns the
  *model default*, overriding the user's persisted effort until they touch
  `/effort` (which unpins). Raising the default (below) defeats this too — the
  bundle even carries explicit `unpinOpus47/Opus48/Fable5LaunchEffort` flags,
  confirming this pin is applied per-model at launch.
- **Not a nerf — leave alone:** subagents/side-calls already inherit the parent
  session's chosen effort via `getAppState`; compaction/web-search side-calls use
  full session effort. No patch needed.

**Model-agnostic by construction.** Nothing here names a model. CC decides
max-support from a **capability** on the model's catalog entry
(`capabilities.includes("max_effort")`, functions `NDe`/`Coe`) plus an explicit
*old-model blocklist* — never a hardcoded id of a current model. So a brand-new
model (the next Opus, the next Fable) inherits the floor the moment Anthropic
ships it, with no change here. This was **verified against the real v2.1.202
bundle**: Fable 5 and Opus 4.8 each end up at a genuine `max`.

**The patches (P0–P3), anchored on string-literal contracts — never minified
symbols or code shape, so they survive minification churn and resolver
restructuring:**
- **P0 cascade the resolver's max-fallback `high` → `xhigh`.** Stock, the
  resolver drops an unsupported `max` *straight* to `high`
  (`if(i==="max"&&!NDe(e))i="high"`), skipping `xhigh`. P0 rewrites that fallback
  to `xhigh`; the resolver's very next line (`if(i==="xhigh"&&!Coe(e))i="high"`)
  then finishes the job. Net: an unsupported `max` degrades **by true
  capability** — `max → xhigh → high` — instead of collapsing to `high`. This is
  what makes flooring *any* starting default to `max` regression-proof.
- **P1 floor `default_effort` → `"max"`, for both `"high"` and `"xhigh"`
  defaults.** The `"high"` raise is always safe (an unsupported `max` falls to
  `high` = stock). The `"xhigh"` raise is applied **only when P0's cascade is
  present** (otherwise SKIPPED — fail-safe, never a regression). This is the
  piece that readies the floor for **future Opus** whether it ships a `"high"`
  default (like Opus 4.8) or an `"xhigh"` default (like Opus 4.7): either way it
  boots at `max`. It also defeats the launch-pin, since the default it resolves
  to is now `max`.
  *Honest scope:* the real **request** path resolves through the guarded resolver
  (`nQ`, P0's site); a separate **display-layer** reader (`Uqo`→`VEe`) reads the
  raw default without the capability guard, so a hypothetical model that can't
  support its own raised default could *show* `max` cosmetically while the effort
  actually sent stays guarded. Inert for every real model (a stock default is
  always within the model's ceiling).
- **P2 uncap the `/effort` enum** `["low","medium","high","xhigh"]` → add `"max"`.
- **P3 validator accepts `"max"`** (captures the minified parameter name).

**Robustness + drift detection.** Each patch is idempotent, self-verifying, and
independent; a missing anchor fails *open* to stock behavior (never worse) and is
reported. `upgrade.sh` snapshots the stock effort surface to
[`data/effort-posture.json`](data/effort-posture.json) and **diffs it each sync** —
a renamed field or restructured enum surfaces as a loud worklist (update the
anchors in `apply-code-patches.mjs`), the same idea as the Part 4 checksum
manifest. Flags: `node lib/apply-code-patches.mjs {apply <in> <out>|posture <in>|verify <in>}`.

**Honest limit.** Model downgrades pushed via Anthropic's **server-side** Statsig
config (e.g. `tengu_auto_mode_config` routing the auto-mode classifier to a small
model) are out of a local binary patch's reach. We document that rather than
pretend a patch closes it. Sonnet is the lowest model we'd ever want for real
work; Haiku is not good enough for the tasks these un-nerfs exist to enable.
