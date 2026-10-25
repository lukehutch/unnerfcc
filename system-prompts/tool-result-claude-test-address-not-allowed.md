<!--
name: 'Tool Result: Claude Test address not allowed'
description: >-
  Informs that the app address is not allowed and must be approved in the
  address dialog before starting.
ccVersion: 2.1.310
variables:
  - ALLOW_ADDRESS_TOOL
-->
 not allowed for this project on this machine. The start comes only after the person's Accept in the address dialog (${ALLOW_ADDRESS_TOOL}). When the allow call before this one recorded nothing, go by its answer; otherwise run "ct.mjs status" and ask about what waits under needsConsent first.
