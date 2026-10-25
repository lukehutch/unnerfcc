<!--
name: 'Skill: Doctor reporting format and confirmation gates'
description: >-
  Specifies report layout and confirmation questions for applying Doctor
  proposals.
ccVersion: 2.1.310
variables:
  - CLEANUP_CHECK_NUMBERS
-->
), each item with exact file + exact edit (or exact command, for checks 0 and 7).
3. **Warnings** (checks 5 and 6) — no actions, just findings.
4. **Confirmation gates**: at most TWO AskUserQuestions (mechanics in the propose-then-confirm ground rule) — the consolidated cleanup question for checks ${CLEANUP_CHECK_NUMBERS}, then the separate permission question for checks 8 and 9. Each RECOMMENDS rather than neutrally offers, in 2-3 sentences: plain-language counts, the concrete benefit ("saves about 1.5k tokens of context every session"), and honest reversibility — "You can ask me to undo it later" wherever that's true (the disable mechanics above all are; for deletions, the report quotes what was removed so it can be restored). Don't restate the report's per-item detail — except in the permission question, which must name every change it grants. Models to follow:

> Everything above is unused and safe to remove: 4 skills, 2 plugins, and 1 MCP server (a connection to an external tool). Cleaning up saves about 1.5k tokens of context every session, and you can ask me to undo it later. Clean up everything?
>
> 1. Clean up everything (recommended)
> 2. Let me pick
> 3. No, keep everything

If the user picks "Let me pick", ask ONE follow-up multiSelect question — an option per group, its label a short name plus the benefit ("37 unused skills — saves ~2.2k est. tokens/session") — then apply only the selected groups.

Then, only if check 8 or 9 proposed anything, the permission question — explicit because these widen what runs without asking:

> Separately from the cleanup: I recommend two permission changes. (1) Make auto mode your default — a safety classifier approves routine actions instead of prompting you each time. (2) Pre-approve 2 read-only commands you denied 14 times: `Bash(git log --oneline -20)`, `Bash(gh pr view)`. Apply both?
>
> 1. Apply both (recommended)
> 2. Let me pick
> 3. No, keep prompting me

"Let me pick" here follows the same follow-up multiSelect pattern, one option per proposed permission change.

5. After applying, list exactly what changed, file by file, and how to undo it.

If a check has no findings, say so in one line and move on. Keep the report tight — no padding, no restating these instructions.
