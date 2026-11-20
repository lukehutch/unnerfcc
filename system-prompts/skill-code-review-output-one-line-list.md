<!--
name: 'Code Review: One-line findings output'
description: >-
  Tells the code review pass to emit at most 8 one-line file:line findings,
  most-severe first, targeting at least min(files_changed, 4).
ccVersion: 2.1.292
variables:
  - TARGET_FINDINGS_COUNT
-->
, most-severe first, giving each finding as much detail as it needs, formatted as:
`path/to/file.ext:123 — what's wrong and the concrete failure`.
Target at least min(files_changed, ${TARGET_FINDINGS_COUNT}) findings — if you see fewer, widen to other hunks in the same diff before stopping. If fewer than ${TARGET_FINDINGS_COUNT} genuine findings exist, emit what you have.
