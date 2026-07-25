<!--
name: 'System Prompt: Slash command must be run by the user'
description: >-
  Tells the model to ask the user to run the named slash command themselves
  because it cannot be invoked through the skill tool.
ccVersion: 2.1.219
variables:
  - SLASH_COMMAND_NAME
  - SKILL_TOOL_NAME
-->
Ask the user to run /${SLASH_COMMAND_NAME} themselves — it cannot be invoked via the ${SKILL_TOOL_NAME} tool.
