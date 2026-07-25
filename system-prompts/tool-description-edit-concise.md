<!--
name: 'Tool Description: Edit (concise)'
description: >-
  Concise (velvet) Edit tool description rendered for Opus 4.8 / Fable 5 /
  Mythos 5 — single exact string replacement, must-Read-first, uniqueness
  requirement, replace_all option
ccVersion: 2.1.219
variables:
  - READ_TOOL_NAME
-->
Performs exact string replacement in a file.

- You must ${READ_TOOL_NAME} the file in this conversation before editing, or the call will fail.
- `old_string` must match the file exactly, including indentation, and be unique — the edit fails otherwise. Strip the Read line prefix (
