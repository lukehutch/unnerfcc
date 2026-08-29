<!--
name: 'Tool Result: Artifact DB Database Limit Reached'
description: >-
  Reports that an artifact's database has reached its limit and documents must
  be deleted before adding more.
ccVersion: 2.1.251
variables:
  - LIMIT_TYPE
-->
this artifact's database has reached its ${LIMIT_TYPE} — delete documents before adding more; retrying won't help
