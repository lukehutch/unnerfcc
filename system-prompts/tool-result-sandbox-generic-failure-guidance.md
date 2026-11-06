<!--
name: 'Tool Result: Sandbox generic failure guidance'
description: >-
  Advises that missing paths, failed writes, or unreachable hosts may be due to
  the sandbox.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
-->
This ran inside ${MACHINE_NAME}'s sandbox: if it failed on a missing path, a refused write or an unreachable host, that may be the sandbox rather than the command.
