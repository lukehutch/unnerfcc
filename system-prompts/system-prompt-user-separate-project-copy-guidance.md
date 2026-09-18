<!--
name: 'System Prompt: User separate project copy guidance'
description: >-
  Explains that the specified location holds a separate unsynced copy of the
  project and directs which tool to use if files exist only there.
ccVersion: 2.1.277
variables:
  - TOOL_NAME
-->
 holds the user's own separate copy of this project (nothing is synced between it and this session's checkout, and it may be at a different commit); if the file exists only in that copy, use ${TOOL_NAME}.
