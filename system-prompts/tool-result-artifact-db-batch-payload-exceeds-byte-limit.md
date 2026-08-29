<!--
name: 'Tool Result: Artifact DB Batch Payload Exceeds Byte Limit'
description: >-
  Reports that a batch write exceeds the byte size limit and advises splitting
  it.
ccVersion: 2.1.251
variables:
  - ACTUAL_BYTES
  - MAX_BYTES
-->
the batch serializes to ${ACTUAL_BYTES} bytes — the limit for one request is ${MAX_BYTES}; split it into smaller batches
