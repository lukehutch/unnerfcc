<!--
name: 'System Prompt: Gemini command with shell argument placeholder'
description: >-
  Explains that a Gemini command cannot be imported because $ARGUMENTS is not
  shell-escaped inside its shell block, so typed arguments could inject
  commands.
ccVersion: 2.1.219
-->
One of its shell blocks contains an argument placeholder — Gemini shell-escapes `{{args}}` inside `!{…}`, Claude Code's `$ARGUMENTS` substitution doesn't, so importing would let typed arguments inject shell commands. Port it manually.
