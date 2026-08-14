<!--
name: 'Tool Result: Egress proxy report detail'
description: >-
  Tail of the artifact network-blocked notice quoting what the environment's
  egress proxy reported about the refused request.
ccVersion: 2.1.231
variables:
  - EGRESS_PROXY_MESSAGE
-->
; the environment's egress proxy reported: ${EGRESS_PROXY_MESSAGE})
