<!--
name: 'Skill: Read the capability surface and type defs before mcp calls'
description: >-
  Directive naming both extracted contract files — how a page reaches any
  capability, and the type definitions — to read before writing any code that
  calls the `mcp` capability.
ccVersion: 2.1.235
variables:
  - CONTRACT_DIR
  - CAPABILITY_SURFACE_FILENAME
  - TYPE_DEFS_FILENAME
-->
Read `${CONTRACT_DIR}/${CAPABILITY_SURFACE_FILENAME}` (how a page reaches any capability on this contract) and `${CONTRACT_DIR}/${TYPE_DEFS_FILENAME}` before writing any code that calls the `mcp` capability — they are
