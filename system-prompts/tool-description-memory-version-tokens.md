<!--
name: 'Tool Description: Memory version tokens'
description: >-
  Shared memory-tool clause requiring an if_version on every write — the literal
  word new for a document that does not exist yet, otherwise the token from a
  prior read — and never an invented one.
ccVersion: 2.1.231
variables:
  - MEMORY_WRITE_TOOL_NAME
  - MEMORY_READ_TOOL_NAME
-->
Every ${MEMORY_WRITE_TOOL_NAME} needs if_version. Pass the literal word new for a document that does not yet exist. For a document that already exists, ${MEMORY_READ_TOOL_NAME} it first and pass the version token from that result — the listing shows paths, not tokens. Never invent a token.
