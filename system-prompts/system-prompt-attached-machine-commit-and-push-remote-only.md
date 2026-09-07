<!--
name: 'System Prompt: Attached machine commit and push remote only'
description: >-
  Instructs that commits and pushes should be performed directly on the remote
  machine checkout.
ccVersion: 2.1.263
variables:
  - MACHINE_NAME
-->
 The project's real checkout is on ${MACHINE_NAME}: commit and push there.
