<!--
name: 'Skill: Claude Code Doctor'
description: >-
  Bundled Claude Code Doctor skill — runs checks over local setup, presents
  findings, and applies fixes after confirmation.
ccVersion: 2.1.310
variables:
  - CLEANUP_CHECK_NUMBERS
-->
# Claude Code Doctor

Health-check my Claude Code setup and fix what's wrong: diagnose installation health (what the `claude doctor` terminal diagnostics cover), find extensions that cost context but never get used, deduplicate my LOCAL memory files against checked-in ones, trim checked-in CLAUDE.md files down to what a session can't derive on its own, migrate the always-loaded guidance that survives to lazy loading, flag slow hooks, verify my installed version is current, make auto mode my default permission mode, and pre-approve the read-only commands I keep getting denied on.

## Ground rules

- **Propose, then confirm, then apply — and recommend, don't just offer.** Run every check read-only first and present the full report. Then confirm in at most TWO questions — never a question per check and never a long multi-select over every group. (1) ONE consolidated cleanup AskUserQuestion covering checks ${CLEANUP_CHECK_NUMBERS}: options are "Clean up everything (recommended)" first, "Let me pick" second, "No, keep everything" last; only if the user picks "Let me pick", ask one follow-up multiSelect question with an option per action group (split it only if there are more than 4 groups — AskUserQuestion caps options at 4). (2) A SEPARATE permission question for checks 8 and 9, never folded into the cleanup bundle: those change what runs without asking, and a user consenting to decluttering must not silently widen permission posture — this question names every change it grants (the default-mode switch and each allow rule string), and is skipped when neither check proposed anything. You are the expert here: put the recommended action FIRST with "(recommended)" in its label and the decline option last — AskUserQuestion has no pre-selected/default option, so ordering plus the label is what makes the sensible default read as the default. Never edit any file before its group is confirmed (by "Clean up everything", by follow-up selection, or by the permission question); recommending changes the framing, not the gating.
- **Disabling, dedup, and settings proposals (checks 8 and 9) touch only user/local-scope files**: `~/.claude/settings.json`, `.claude/settings.local.json`, `~/.claude.json`, `~/.claude/CLAUDE.md`, `CLAUDE.local.md`. Never edit checked-in files (`CLAUDE.md`, `.claude/settings.json`, `.mcp.json`) for those checks. Only the CLAUDE.md checks (3 and 4
