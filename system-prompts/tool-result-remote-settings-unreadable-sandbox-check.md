<!--
name: 'Tool Result: Remote settings unreadable during sandbox check'
description: >-
  Error stating settings could not be read on the remote machine to verify
  sandbox requirements.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} could not read all of its settings when this call arrived, so it could not tell whether this session's calls may run there or only inside a Linux VM — nothing ran. The call can be sent again in a moment. If it is refused this way again, tell the user that Claude Code on ${MACHINE_NAME} cannot read its settings, and that its owner can check the settings files there and whether the organization's settings have loaded.
