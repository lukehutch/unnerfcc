<!--
name: 'Tool Result: One-way sync warning'
description: >-
  Warning that the attached machine only sends files to the session and does not
  receive local changes back.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} only sends files to this session and does not take this session's changes back (it is not bound to the session as a device, or cannot take files back); the command ran on the user's files as they are there
