<!--
name: 'System Prompt: Machine detached omit argument'
description: >-
  Notice that no remote machine is attached, directing the model to run commands
  locally without target arguments.
ccVersion: 2.1.310
variables:
  - PREFIX
  - ARGUMENT_NAME
-->
${PREFIX}; omit "${ARGUMENT_NAME}" and run commands here. If the task needs that machine's files, tools or logins, say so instead of doing it here.
