<!--
name: 'Tool Result: Sandbox network failure guidance'
description: Advises that network host connection failures may be caused by the sandbox.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
-->
This ran inside ${MACHINE_NAME}'s sandbox: if it failed reaching a network host, that may be the sandbox rather than the command.
