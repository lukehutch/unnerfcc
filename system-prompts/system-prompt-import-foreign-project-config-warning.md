<!--
name: 'System Prompt: Repo-local Codex/Gemini config not auto-imported'
description: >-
  Explains that repo-authored .codex/.gemini config is excluded from an
  unattended import and the user must review those entries individually.
ccVersion: 2.1.219
-->
 from this repo's `.codex/` or `.gemini/` directory. These are NOT listed and `--yes` will NOT import them, because project config can be authored by anyone with write access to the repo — tell the user to run `claude import` from a terminal to review them individually.
