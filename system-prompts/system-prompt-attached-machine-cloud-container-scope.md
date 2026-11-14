<!--
name: 'System Prompt: Attached machine cloud container scope'
description: >-
  Clarifies that chat attachments and scratch work live in the cloud container,
  separate from the attached machine's files and hardware.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
-->
: this chat's own cloud container. What the user attached to this chat (under /mnt/user-data) and your scratch work are here; whether a tool of ${MACHINE_NAME} can open an attached file shows when you try it. The container has none of that machine's files or hardware, and nothing moves between the two by itself.
