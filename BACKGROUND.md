# Background

Where these un-nerfed prompts came from and how unnerfcc patches them in.

---

## How unnerfcc works

Claude Code ships as a compiled **Bun native binary** (~430 MB ELF/Mach-O/PE) with all its prompts baked in as string literals inside a minified JS bundle — you can't open a config file and change them. unnerfcc is a **standalone** toolkit (in [`lib/`](lib)) that reads those prompts out, rewrites the ones that cap the model, and writes them back:

1. **Extract** the JS bundle from the binary — [`lib/bun-binary.mjs`](lib/bun-binary.mjs) parses the ELF `.bun` section and Bun's standalone module-graph blob (no tweakcc needed; just `node-lief` for the ELF surgery).
2. **Classify + label** every string — [`scripts/classify.mjs`](scripts/classify.mjs) SHA-256-fingerprints each string literal and asks **Claude** whether it's a model-facing *prompt* and, if so, whether it carries brevity/effort *nerfs* worth lifting. For prompts it also proposes a `name` + `description` and a per-`${…}`-**slot binding audit** — a pre-labeled worklist a maintainer signs off (the same "propose, then sign off" loop tweakcc-fixed uses), and it may grep the bundle for a hard string's surrounding code to disambiguate. Results are cached in [`data/string-catalog.json`](data/string-catalog.json) keyed by content hash, so the work is done once: the initial pass swept the whole bundle (Haiku, batched), and each later CC release classifies only its genuinely-new strings with **Opus**. No brittle "does this look like a prompt" heuristic; Claude decides.
3. **Un-nerf** — [`scripts/apply-unnerfs.py`](scripts/apply-unnerfs.py) holds the `Rule(stock → un-nerf)` replacements. Un-nerfing is *holistic*: each rule rewrites a whole prompt string (adding, removing, or changing sentences), lifting "be brief / do the minimum" into "be thorough."
4. **Patch + re-package** — [`lib/patch-prompts.mjs`](lib/patch-prompts.mjs) **parses the bundle with @babel/parser** and locates each prompt by matching string-producing AST nodes on their DECODED content — never a regex over the raw text. Because it matches on *what the string says*, not how it's spelled, it finds a prompt whether the bundle stores it as a single- or double-quoted literal, a backtick template (with `${…}` interpolation), or a **pure-string `+`-concatenation run** (any mix of quote styles, folded into one contiguous string) — and it patches **every** node that matches, so a prompt reused at several call-sites (even under different encodings) is un-nerfed at all of them. (A `+` run *separated by a variable* — `"a"+x+"b"` — is left as its separate parts, not folded: those interpolate a runtime value, not authored prompt text.) A **slot-count audit fails closed** rather than splice a mis-bound `${…}` placeholder; skips are graded by severity — a benign no-op is silent, but a *lost* un-nerf raises a banner and **exits 3** — and the whole output is re-parsed before it ships. [`lib/bun-binary.mjs`](lib/bun-binary.mjs) rebuilds the Bun blob and re-injects it, then boot-checks the result before it's installed.
5. **Lift silent effort caps** *(best-effort)* — [`lib/apply-code-patches.mjs`](lib/apply-code-patches.mjs) edits CC's own code/data strings (not prompts) to undo Anthropic's in-code effort degradation: raise the flagship's mid-tier `default_effort` to `max` (CC's capability guard safely downgrades any model that can't support it), and uncap the `/effort` setting to `max`. It runs *after* step 4 on the prompt-patched bundle and can **never block the prompt un-nerfs** — a drifted anchor is reported, the prompt un-nerfs ship anyway. Anchored on string-literal contracts (the effort vocabulary + the `default_effort` field name), so it survives minified-symbol churn and effort-code restructuring; a `data/effort-posture.json` manifest is diffed each upgrade to surface drift loudly.

Everything is our own code, using only general libraries (`node-lief`, `@babel/parser`, `prettier`). One-command flows: [`install.sh`](install.sh) installs Claude Code if needed and patches its binary; [`upgrade.sh`](upgrade.sh) syncs to a new CC release. If Bun ever changes its binary format, that's detected and reported (update `lib/bun-binary.mjs`). Full mechanics: [UPGRADE.md](UPGRADE.md).

**We no longer depend on the tweakcc-fixed project.** unnerfcc originally targeted [skrabe/tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed) (a fork of [Piebald's tweakcc](https://github.com/Piebald-AI/tweakcc)) — a great tool for editing CC prompts — and studied its Bun-binary handling to write our own. We reimplemented the ~40% we actually needed (extract / patch / re-package) so we're not gated on its release cadence or its extra default-on patches. tweakcc remains a useful reference if the Bun format shifts.

### Why binary patching and not a text patcher?

An earlier approach ([roman01la's gist](#the-original-gist)) installed Claude Code from npm — back when it shipped as plain JavaScript — ran `sed`-style replacements against `cli.js`, and repointed the `claude` symlink. Once Claude Code moved to a compiled Bun binary, that stopped working. unnerfcc is the modern equivalent: same philosophy (edit the prompts), different mechanism — extract the embedded JS, splice, rebuild the Bun blob, and boot-check.

---

## Where the edits came from

The un-nerfs have two origins, layered in order.

### The original gist

[roman01la's patch-claude-code.sh](https://gist.github.com/roman01la/483d1db15043018096ac3babf5688881) is a bash script that applied 11 string replacements to Claude Code's old `cli.js` distribution. Each flipped a "be brief" instruction into a "be thorough" one. The gist author observed that stock Claude Code carries roughly a 5:1 ratio of brevity directives to thoroughness directives, and that imbalance was making the model cut corners on real work.

I didn't run the script (it targets a distribution format that no longer exists), but the patches served as a template — I translated the 11 edits into tweakcc `.md` format by hand, and that became the starting point for this repo.

**The gist's 11 patches:**

| # | What it targeted | What changed |
|---|---|---|
| 1 | "simplest approach that works" | "correctly and completely solves" |
| 2 | "do the minimum the task requires" | "do the work a senior developer would do" |
| 3 | "don't add abstractions beyond what the task requires" | softened to allow reasonable cleanup |
| 4 | anti-gold-plating clause | carve-out for fixing obviously broken adjacent code |
| 5 | error-handling guidance | add validation at real boundaries (I/O, network, user input) |
| 6 | "don't refactor" | softened |
| 7 | "match the scope of the request" | "address closely related issues you discover" |
| 8 | explore-agent "as quickly as possible" | removed; completeness preferred |
| 9 | final-report brevity cap on subagents | removed |
| 10 | "one-line docstrings max" | removed; meaningful docs allowed |
| 11 | "2-sentence end-of-turn summary" cap | removed; scale to the work |

**A/B evidence from the gist author:** porting Box2D (~30k lines of C) to JavaScript. Unpatched Claude Code produced 1,419 lines with an O(n²) broad phase and no sub-stepping; patched Claude Code produced 1,885 lines (+33%) with a dynamic AABB tree, 4-level sub-stepping, and soft contact constraints — an actual physics-engine port versus a toy.

The six files that carry the gist's DNA directly:

- `system-prompt-tone-concise-output-short.md`
- `system-prompt-doing-tasks-no-unnecessary-error-handling.md`
- `system-prompt-executing-actions-with-care.md`
- `system-prompt-agent-thread-notes.md`
- `agent-prompt-explore.md`
- `agent-prompt-general-purpose.md`

### The extensions

Starting from those six, the same thesis was extended across the full prompt set. Whenever Claude Code was reflexively terse in a way that hurt output quality ("here's the fix, no explanation"), the behavior was traced to the prompt causing it, that prompt edited, and the change committed. The major areas beyond the gist:

- Mid-turn updates and end-of-turn summaries scale with the work — no hard 2-sentence cap.
- Code comments and docstrings are allowed to be meaningful.
- Core communication-style prompts favor depth over token minimization.
- Subagent and explore prompts demand thorough reports with file paths, code excerpts, and reasoning.
- Caps on subagent usage removed ("use the minimum number of subagents," "not excessively").
- Tool-usage, compaction, loop-check, thread-notes, PR-review, memory, learning-insights, and cron/onboarding prompts produce full-context output instead of one-liners.

The complete, current inventory of active un-nerfs is `scripts/apply-unnerfs.py`; the keep/flip rationale behind each is [UNNERF-GUIDE.md](UNNERF-GUIDE.md) Part 1.

---

## How the repo is kept current

On a new Claude Code release, [`upgrade.sh`](upgrade.sh) does it end to end, all with our own `lib/` toolkit — extract the new binary's JS, classify its new strings (Opus, cached by SHA-256, with proposed names for maintainer sign-off), replay the un-nerf rules, and verify the patch boots. The un-nerf rules in [`scripts/apply-unnerfs.py`](scripts/apply-unnerfs.py) are the source of truth; `system-prompt-checksums.json` fingerprints the stock prompts so each bump reports what Anthropic changed. Full playbook: [UPGRADE.md](UPGRADE.md); per-script flags: [MAINTENANCE.md](MAINTENANCE.md).

**Not committed** (built or fetched locally; machine-specific or too large):

- `lib/node_modules/` — `node-lief` is a platform-specific native addon; `upgrade.sh`/`install.sh` run `npm install` in `lib/` on first use.
- The Claude Code binary — ~430 MB, and stock is always a `npm install -g @anthropic-ai/claude-code@<ver>` away, so rollback is a reinstall (no backup is kept).
