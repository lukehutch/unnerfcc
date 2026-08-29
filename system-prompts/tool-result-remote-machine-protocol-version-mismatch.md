<!--
name: 'Tool Result: Remote machine protocol version mismatch'
description: >-
  Reports that the two Claude Code builds share no protocol version and the call
  did not run.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - PROTOCOL_VERSION_NOTE
  - UPDATE_RECOMMENDATION
  - RUN_IMPOSSIBLE_NOTE
-->
${MACHINE_NAME} is attached but the two Claude Code builds share no remote-tool protocol version (${PROTOCOL_VERSION_NOTE}); the call did not run; ${UPDATE_RECOMMENDATION}. ${RUN_IMPOSSIBLE_NOTE}
