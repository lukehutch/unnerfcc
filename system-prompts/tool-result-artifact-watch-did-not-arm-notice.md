<!--
name: 'Tool Result: Artifact live subscription did not arm notice'
description: >-
  Reports that the live subscription did not arm with reasons and guidance not
  to claim to be watching.
ccVersion: 2.1.251
variables:
  - FAILURE_REASON
  - RETRY_ADVICE
-->
 did not arm — ${FAILURE_REASON}. This session is NOT watching it and will not hear when it is republished; ${RETRY_ADVICE}, and do not claim to be watching it meanwhile.
