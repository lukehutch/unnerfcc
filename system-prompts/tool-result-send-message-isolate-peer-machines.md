<!--
name: 'Tool Result: SendMessage blocked by peer-machine isolation'
description: >-
  Tells the model isolatePeerMachines requires approval before a message can
  reach the named cross-machine session and that nothing was sent.
ccVersion: 2.1.231
variables:
  - PEER_SESSION_KIND
-->
isolatePeerMachines is enabled: sending to ${PEER_SESSION_KIND} '
