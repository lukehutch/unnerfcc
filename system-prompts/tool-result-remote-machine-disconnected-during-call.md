<!--
name: 'Tool Result: Remote machine disconnected during call'
description: >-
  Warns that the machine disconnected mid-call and to verify effects before
  re-running.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} disconnected during the call. If the command had started, it has most likely continued to run there, but its result could not be delivered. Do not simply re-run it — first check whether it took effect (e.g. whether the file, commit or process now exists) or ask the user.
