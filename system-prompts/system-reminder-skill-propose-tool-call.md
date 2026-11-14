<!--
name: 'System Reminder: Propose skill change via proposal tool'
description: >-
  Instructs the model to call the proposal tool with the full SKILL.md content
  as skillMd rather than edits to let the user save changes.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
-->
 To let the user save this change, call `${TOOL_NAME}` with the complete SKILL.md. Send it as `skillMd`, not as `edits`: this file already has the change, so `edits` would fail or apply it twice.
