<!--
name: 'Tool Result: File reference invalid retry'
description: >-
  Rejects an invalid file reference attachment and instructs fixing and
  re-calling.
ccVersion: 2.1.318
variables:
  - CONDITION
  - DETAILS
-->
 call attaches a file by reference but ${CONDITION}, ${DETAILS} Fix that and make the call again.
