<!--
name: 'System Prompt: Machine detached omit argument'
description: >-
  Notice that no remote machine is attached, directing the model to run commands
  locally without target arguments.
ccVersion: 2.1.251
variables:
  - ARGUMENT_NAME
-->
No machine is attached to this session any more; omit "${ARGUMENT_NAME}" and run commands here.
