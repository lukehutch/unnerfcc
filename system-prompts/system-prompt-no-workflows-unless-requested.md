<!--
name: 'System Prompt: No workflows or deep research unless requested'
description: >-
  Session-guidance line telling the model not to use workflows or deep research
  unless the user asked for it.
ccVersion: 2.1.257
variables:
  - TOOL_NAME
-->
Do not use the ${TOOL_NAME} tool, workflows, or deep-research unless the user, a CLAUDE.md file, or a skill asks for it
