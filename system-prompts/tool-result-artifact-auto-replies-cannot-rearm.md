<!--
name: 'Tool Result: Auto-replies Cannot Re-arm'
description: >-
  Informs the model that auto-replies cannot be re-armed until a condition is
  met and to notify the user.
ccVersion: 2.1.251
variables:
  - REASON
  - CONDITION
-->
: ${REASON}. Nothing here can re-arm them until ${CONDITION}; tell the user.
