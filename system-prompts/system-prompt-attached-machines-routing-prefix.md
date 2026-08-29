<!--
name: 'System Prompt: Attached machines routing prefix'
description: >-
  Opening instructions explaining how to target attached machines versus
  executing in the local container.
ccVersion: 2.1.251
variables:
  - FORWARD_INSTRUCTION
-->
Machines attached to this session — ${FORWARD_INSTRUCTION} to run it on that machine; omit it to run here (
