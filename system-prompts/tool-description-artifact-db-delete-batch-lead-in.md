<!--
name: 'Tool Description: Artifact database delete and batch write limit'
description: >-
  Specifies delete operation and the batch size limit for artifact database
  writes.
ccVersion: 2.1.270
variables:
  - MAX_BATCH_WRITES
-->
 "delete" removes it (`collection` + `doc_id`), and "batch" applies up to ${MAX_BATCH_WRITES} 
