<!--
name: 'Tool Description: Edit (concise)'
description: >-
  Concise Edit tool description — old_string must match exactly and uniquely,
  the Read line prefix is stripped before matching, and replace_all swaps every
  occurrence.
ccVersion: 2.1.231
variables:
  - READ_LINE_PREFIX_DESCRIPTION
-->

- `old_string` must match the file exactly, including indentation, and be unique — the edit fails otherwise. Strip the Read line prefix (${READ_LINE_PREFIX_DESCRIPTION}) before matching.
- `replace_all: true` replaces every occurrence instead.
