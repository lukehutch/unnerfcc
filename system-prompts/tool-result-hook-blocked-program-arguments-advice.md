<!--
name: 'Tool Result: Hook blocked program arguments advice'
description: >-
  Advises separating the program and its arguments in hook configuration or
  installing required tooling.
ccVersion: 2.1.310
variables:
  - INSTALL_INSTRUCTION
-->
${INSTALL_INSTRUCTION} and start a new session, or put the program in "command" and its arguments in "args" ("args": [] if it has none) and set "onFailure" to "block" so that failures still block.
