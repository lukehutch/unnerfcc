<!--
name: 'Skill: Read the type definitions before mcp calls'
description: >-
  Directive naming the extracted type-definitions file to read before writing
  any code that calls the `mcp` capability.
ccVersion: 2.1.235
variables:
  - CONTRACT_DIR
  - TYPE_DEFS_FILENAME
-->
Read `${CONTRACT_DIR}/${TYPE_DEFS_FILENAME}` before writing any code that calls the `mcp` capability — it is
