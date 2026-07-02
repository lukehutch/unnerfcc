# Background

Where these un-nerfed prompts came from and how tweakcc-fixed works.

---

## What is tweakcc-fixed?

[tweakcc](https://github.com/Piebald-AI/tweakcc) is a community tool by Piebald AI that makes Claude Code's system prompts editable. Claude Code ships as a compiled Bun native binary with its prompts baked in as string literals — you can't just open a config file and change them.

[tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed) is a strict-superset fork of it, and the tool this repo targets. When you run it, it:

1. Finds the Claude Code binary on disk.
2. Extracts every system prompt, tool description, agent prompt, skill body, and reference blob into `.md` files under `~/.tweakcc/system-prompts/` (Windows: `C:\Users\<you>\.tweakcc\system-prompts\`).
3. Records a hash of each original prompt in `systemPromptOriginalHashes.json`.
4. On a bare `--apply`, recompiles the binary with your edited `.md` content substituted in, and records applied hashes in `systemPromptAppliedHashes.json`.
5. Can keep a backup of the original binary (~400 MB) for `--restore`. (This repo's [`install.sh`](./install.sh) **deletes** that backup after patching — it's large and stock is always re-extractable, so rollback here is a Claude Code reinstall, not `--restore`.)

Edit any prompt in a text editor, run `tweakcc-fixed --apply`, and Claude Code uses your version from that point on. That folder is exactly what this repository mirrors.

**Why the fork and not the base tool?** Coverage, mostly. For Claude Code v2.1.198 the fork's extractor catalogs **1,437 prompt sites (1,331 unique prompts)** against upstream's 540 — it also captures per-turn `<system-reminder>` fragments, the *values* of interpolated `${VARIABLES}` (which is where more than one brevity nerf turned out to hide — see UNNERF-GUIDE Part 9), compact tool-description variants, and MCP instruction blocks. It also applies prompt overrides on native (Bun-compiled) installs, where upstream gates them off. Two caveats come with it: the npm package name is `tweakcc-fixed` and only versions **≥ 2.0.0** are this fork (≤ 1.0.5 was an unrelated, unmaintained fork); and it ships feature patches of its own, two of which are **on by default** and change model-facing behavior beyond prompts — `install.sh` seeds those off so this project stays prompts-only (see the README install notes).

**Which build to use:** [skrabe/tweakcc-fixed](https://github.com/skrabe/tweakcc-fixed) — `main`, or a release ≥ 2.0.0. [`install.sh`](./install.sh) builds from `main` because npm releases can lag a fresh Claude Code build by hours-to-days, and `main` carries the prompt-locator and repack fixes soonest (set `TWEAKCC_VERSION=latest` to use a released tweakcc-fixed via `npx` instead). A **bare** `tweakcc-fixed --apply` is the only invocation that applies system-prompt `.md` edits — `--apply --patches "<ids>"` targets feature/theme patches, not prompts. Full command reference: [UNNERF-GUIDE.md](UNNERF-GUIDE.md) Part 8.

### Why tweakcc and not a text patcher?

An earlier approach ([roman01la's gist](#the-original-gist)) installed Claude Code from npm — back when it shipped as plain JavaScript — ran `sed`-style replacements against `cli.js`, and repointed the `claude` symlink. Once Claude Code moved to a compiled Bun binary with bytecode integrity checks, that stopped working. tweakcc (and this fork of it) is the modern equivalent: same philosophy (edit the prompts), different mechanism (binary patching with hash verification and rollback).

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

## How the repo is built and kept current

Two scripts do the work, so a Claude Code version bump never requires hand-reverting files:

1. **Extract stock.** `scripts/sync-version.mjs` rebuilds the full stock `.md` set from tweakcc-fixed's published prompt data for the target version — byte-identical to a tweakcc-fixed extraction.
2. **Replay un-nerfs.** `scripts/apply-unnerfs.py` re-applies every un-nerf on top of that fresh stock.
3. **Detect drift.** `system-prompt-checksums.json` fingerprints the *stock* prompts, so each bump reports exactly what Anthropic changed, added, or removed — uncoloured by the un-nerfs.

The end-to-end playbook is [UNNERF-GUIDE.md](UNNERF-GUIDE.md); per-script flags are in [MAINTENANCE.md](MAINTENANCE.md).

**Files deliberately excluded** (tweakcc regenerates them per-install; machine-specific or too large to redistribute):

- `native-binary.backup` (~400 MB) and `native-claudejs-{orig,patched}.js` — not mine to redistribute (and `install.sh` deletes them from `~/.tweakcc` too; see above).
- `systemPromptOriginalHashes.json` / `systemPromptAppliedHashes.json` — machine-specific.
- `config.json`, `prompt-data-cache/`, and other local state.

Run tweakcc-fixed yourself and these get generated for your install.
