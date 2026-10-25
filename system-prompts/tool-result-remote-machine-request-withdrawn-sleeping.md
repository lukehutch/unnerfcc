<!--
name: 'Tool Result: Remote machine request withdrawn while sleeping'
description: >-
  Informs that the request was withdrawn and the command will stop when the
  machine wakes.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
This session has stopped waiting for it and withdrew its request: the command will be stopped when ${MACHINE_NAME} wakes, and may have partly run. Do not repeat it without checking.
