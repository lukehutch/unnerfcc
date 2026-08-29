<!--
name: 'Tool Result: Sync branch mismatch held back'
description: >-
  Notice that changes are held back from the remote machine because its checkout
  is on a different git branch.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
the user has switched the checkout on ${MACHINE_NAME} to another branch than the one this session's changes were made on, so your edits here are held back from it
