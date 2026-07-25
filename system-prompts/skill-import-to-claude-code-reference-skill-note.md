<!--
name: 'Skill: Import reference skill note'
description: >-
  Notes that the import command also writes an `import-to-claude-code` reference
  skill capturing unmapped items, and how to skip that write.
ccVersion: 2.1.219
variables:
  - IMPORT_COMMAND_NAME
-->
- `${IMPORT_COMMAND_NAME}` also writes a reference skill (`skills/import-to-claude-code/` in the Claude config directory) capturing the unmapped items above for manual porting — to skip that write, use the terminal picker instead.
