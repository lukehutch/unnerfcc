<!--
name: 'Tool Result: Sandbox startup error'
description: >-
  Explains that bwrap or sandbox-exec errors mean the sandbox failed to
  initialize.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
-->
 Its output is only a bwrap or sandbox-exec error, which usually means the sandbox could not start and the command never ran. If so, running it again will not help: tell the user the sandbox on ${MACHINE_NAME} may not be starting.
