<!--
name: 'System Prompt: Attached machine commit and push remote only'
description: >-
  Instructs that commits and pushes should be performed directly on the remote
  machine checkout.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
-->
 The project's real copy is on ${MACHINE_NAME}: when the user asks for a commit or a push, make it there, if that folder is a git checkout.
