<!--
name: 'Tool Result: Remote sandbox mandatory but unavailable'
description: >-
  Error stating calls must run in a sandbox but the sandbox is unavailable on
  the remote machine.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} is set to run this session's calls only inside a Linux VM, and the VM is not available — nothing ran. Sending the call again will not change that. Tell the user that the Linux VM on ${MACHINE_NAME} is not available, and that its owner can check Claude Code there.
