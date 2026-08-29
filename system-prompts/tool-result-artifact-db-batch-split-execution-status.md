<!--
name: 'Tool Result: Artifact DB Batch Split Execution Status'
description: >-
  Summarizes the execution status of earlier and later writes in an interrupted
  batch.
ccVersion: 2.1.251
variables:
  - WRITES_BEFORE_STATUS
  - WRITES_AFTER_STATUS
-->
. The ${WRITES_BEFORE_STATUS}; the ${WRITES_AFTER_STATUS} after it did not run.
