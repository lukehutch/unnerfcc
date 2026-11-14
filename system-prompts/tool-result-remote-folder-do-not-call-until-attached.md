<!--
name: 'Tool Result: Do not call remote folder until attached'
description: >-
  Model-facing instruction forbidding calling a remote machine with the detached
  folder name until it is reattached.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
  - ATTACHED_FOLDER
-->
Do not call ${MACHINE_NAME} with "${ATTACHED_FOLDER}" until it is attached again.
