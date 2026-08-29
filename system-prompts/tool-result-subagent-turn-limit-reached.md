<!--
name: 'Tool Result: Subagent turn limit reached'
description: >-
  Reports that a subagent hit its turn limit before finishing and explains how
  to proceed.
ccVersion: 2.1.251
variables:
  - PREFIX
  - TURN_LIMIT
  - STATUS_NOTE
  - RESUME_INSTRUCTION
-->
${PREFIX}${TURN_LIMIT}-turn limit before finishing. ${STATUS_NOTE}${RESUME_INSTRUCTION}
