<!--
name: 'Tool Result: Artifact DB Collection Limit Reached'
description: >-
  Reports that a database collection has reached its limit and documents must be
  deleted.
ccVersion: 2.1.251
variables:
  - LIMIT_TYPE
-->
this collection has reached its ${LIMIT_TYPE} — delete documents; retrying won't help
