<!--
name: 'Tool Result: Remote machine request withdrawn nothing ran'
description: >-
  Reports that the request was withdrawn on the machine, nothing ran, and
  provides retry advice.
ccVersion: 2.1.251
variables:
  - FAILURE_REASON
  - RETRY_GUIDANCE
-->
${FAILURE_REASON}; the request was withdrawn there and nothing ran. ${RETRY_GUIDANCE}
