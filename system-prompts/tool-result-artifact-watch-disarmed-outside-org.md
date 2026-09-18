<!--
name: 'Tool Result: Artifact watches disarmed outside organization'
description: >-
  Informs the model that watches cannot be re-armed outside the organization and
  advises not to retry.
ccVersion: 2.1.277
variables:
  - DISARM_REASON
-->
: ${DISARM_REASON}. No account signed in outside its organization can re-arm them; tell the user, and do not retry.
