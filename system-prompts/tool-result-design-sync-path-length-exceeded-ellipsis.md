<!--
name: 'Tool Result: Design sync path length exceeded by ellipsis expansion'
description: >-
  Explains that ellipsis characters expand in Claude Design and cause paths to
  exceed length limits.
ccVersion: 2.1.318
variables:
  - MAX_CHARS
-->
: claude.ai/design stores "…" as three dots, which takes these paths past ${MAX_CHARS} characters, the longest this tool handles: 
