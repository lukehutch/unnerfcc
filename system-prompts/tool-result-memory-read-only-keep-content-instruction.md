<!--
name: 'Tool Result: Memory read-only keep content instruction'
description: >-
  Instructs how to keep content written to a read-only store and inform the user
  accurately.
ccVersion: 2.1.251
variables:
  - RESAVE_INSTRUCTION
-->
To keep content you wrote, ${RESAVE_INSTRUCTION}. If you told the user this was saved or remembered, tell them plainly that it was not shared and where you re-saved it (describe the memory location in plain terms, not as a filesystem path).
