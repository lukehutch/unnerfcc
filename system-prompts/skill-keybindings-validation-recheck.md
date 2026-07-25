<!--
name: 'Skill: Keybindings validation recheck'
description: >-
  Notes that Claude Code validates keybindings.json at load and requires
  re-checking the edited file against the rules that follow.
ccVersion: 2.1.219
-->
Claude Code validates `~/.claude/keybindings.json` when it loads; warnings go to the debug log. After editing the file, re-check it against the rules below and fix anything that matches.
