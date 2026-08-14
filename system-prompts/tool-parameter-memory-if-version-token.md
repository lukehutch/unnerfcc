<!--
name: 'Tool Parameter: Memory write if_version token'
description: >-
  if_version field of the memory write tool — the 12-character token from the
  most recent read or write of the file, or the literal word new for a file that
  does not exist yet, never an invented value.
ccVersion: 2.1.231
variables:
  - MEMORY_READ_TOOL_NAME
  - MEMORY_WRITE_TOOL_NAME
-->
Pass the 12-character version token from your most recent ${MEMORY_READ_TOOL_NAME} or ${MEMORY_WRITE_TOOL_NAME} of this file. For a file that does not yet exist (not shown in the listing), pass the literal word new (without quotes; an empty string is treated the same way). For any file already in the listing, ${MEMORY_READ_TOOL_NAME} it first to get its version token — the listing itself does not contain version tokens. Never invent a value.
