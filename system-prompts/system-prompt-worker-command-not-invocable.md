<!--
name: 'System Prompt: Command not available to workers'
description: >-
  Tells a worker the command cannot be invoked through the skill tool and to
  report its unavailability back to the coordinator.
ccVersion: 2.1.219
variables:
  - SKILL_TOOL_NAME
-->
It cannot be invoked via the ${SKILL_TOOL_NAME} tool. Report to the coordinator that this command is not available to workers.
