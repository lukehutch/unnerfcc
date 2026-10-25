<!--
name: 'Tool Result: Read file anyway override parameter'
description: >-
  Informs the model how to force reading an oversized file up to remaining
  context room.
ccVersion: 2.1.310
variables:
  - READ_TOOL_NAME
  - FORCE_READ_PARAMETER
-->
 To read it anyway, up to what still fits in your context, call ${READ_TOOL_NAME} again with ${FORCE_READ_PARAMETER}: true — only if you genuinely need all of it or the user asked for the whole file.
