<!--
name: 'Tool Result: Remote sandbox mandatory but unavailable'
description: >-
  Error stating calls must run in a VM but the VM is unavailable on the remote
  machine.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} is set to run this session's calls only inside a VM, and the VM is not available — nothing ran. Sending the call again will not change that. Tell the user that the VM on ${MACHINE_NAME} is not available
