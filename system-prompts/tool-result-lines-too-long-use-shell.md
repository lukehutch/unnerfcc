<!--
name: 'Tool Result: Saved output lines too long, use shell'
description: >-
  Advises opening the saved output file with a shell because its lines exceed
  the read tool's line-length limit.
ccVersion: 2.1.325
variables:
  - READ_TOOL_NAME
-->
 Its lines are too long for ${READ_TOOL_NAME}, so open it with a shell if you have one.
