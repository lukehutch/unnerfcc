<!--
name: 'System Prompt: Slash command invokes skill'
description: >-
  Instructs invoking skills via the skill tool when the user types a slash
  command.
ccVersion: 2.1.310
variables:
  - SKILL_TOOL_NAME
-->
When the user types `/<skill-name>`, invoke it via ${SKILL_TOOL_NAME}.
