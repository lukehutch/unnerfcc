<!--
name: 'System Prompt: Machine reconnect parameter guidance'
description: >-
  Instructs naming the machine parameter to wait for reconnection and checking
  the call error if it still does not answer.
ccVersion: 2.1.325
variables:
  - MACHINE_PARAM
-->
To use a machine again, name it with "${MACHINE_PARAM}" as before: the call waits a few seconds for it to reconnect. If it still does not answer, the call's error says what to do next.
