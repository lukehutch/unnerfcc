<!--
name: 'Tool Result: Background command running do not duplicate'
description: >-
  Warns against starting a second copy of an actively running background command
  and provides the stop command.
ccVersion: 2.1.318
variables:
  - STOP_COMMAND
-->
It is running now: do not start a second copy while it runs. If it is no longer needed, stop it with ${STOP_COMMAND}.
