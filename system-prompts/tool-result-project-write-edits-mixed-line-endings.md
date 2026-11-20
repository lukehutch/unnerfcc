<!--
name: 'Tool Result: project_write edits mixed line endings'
description: >-
  Refuses edits on a doc with mixed CRLF and LF line endings and directs passing
  full content instead.
ccVersion: 2.1.329
variables:
  - FALLBACK_INSTRUCTION
-->
This doc mixes CRLF and LF line ends, so edits cannot be matched safely. Instead, ${FALLBACK_INSTRUCTION}
