<!--
name: 'Tool Result: Peer session not reachable'
description: >-
  Tells the model the named peer session cannot be reached, followed by the
  disambiguation hints and the next step to try.
ccVersion: 2.1.231
variables:
  - PEER_SESSION_NAME
  - NEAREST_MATCH_HINT
  - REACHABLE_PEERS_HINT
  - STALE_BRIDGE_HINT
  - NEXT_STEP_HINT
-->
No peer session named '${PEER_SESSION_NAME}' is reachable.${NEAREST_MATCH_HINT}${REACHABLE_PEERS_HINT}${STALE_BRIDGE_HINT}
${NEXT_STEP_HINT}
