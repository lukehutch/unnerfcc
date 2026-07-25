<!--
name: 'System Reminder: Memory Staleness Caveat'
description: >-
  Memory-recall caveat warning that code-behavior claims and file:line citations
  may be outdated and must be verified against current code.
ccVersion: 2.1.219
variables:
  - MEMORY_AGE_DAYS
-->
This memory is ${MEMORY_AGE_DAYS} days old. Memories are point-in-time observations, not live state — claims about code behavior or file:line citations may be outdated. Verify against current code before asserting as fact.
