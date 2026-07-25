<!--
name: 'Skill: Read contract type defs before MCP calls'
description: >-
  Requires reading the extracted type definitions file before writing any
  window.claude.mcp call, as it is authoritative over any remembered API shape.
ccVersion: 2.1.219
variables:
  - CONTRACT_DIR
  - TYPE_DEFS_FILENAME
  - ADDITIONAL_CONTRACT_NOTES
-->
. Read `${CONTRACT_DIR}/${TYPE_DEFS_FILENAME}` before writing any `window.claude.mcp` call — it is authoritative for this contract version over any remembered API shape. ${ADDITIONAL_CONTRACT_NOTES}
