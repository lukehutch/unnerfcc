<!--
name: 'Tool Result: Claude in Chrome session browser unreachable'
description: >-
  Reports that the browser chosen for this session could not be reached with
  troubleshooting steps.
ccVersion: 2.1.293
variables:
  - ORG_GUIDANCE
  - EXTRA_NOTE
-->
Browser extension is not connected. The browser chosen for this session could not be reached: the computer running it may be closed or asleep, Chrome may not be running there, or this session may not be able to connect to Chrome. Ask the user to make sure that computer is awake and Chrome is open there, then retry. If it still fails, ask the user to check that the Claude extension in that Chrome is signed in to the same claude.ai account they use here.${ORG_GUIDANCE} ${EXTRA_NOTE}
