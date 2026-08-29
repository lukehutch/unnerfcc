<!--
name: 'Tool Parameter: Artifact database operation'
description: >-
  db_op field of the artifact tool — which operations belong to read_db and
  which to write_db, including batch writes, and that it is required for both
  database actions.
ccVersion: 2.1.251
variables:
  - MAX_BATCH_WRITES
-->
Database operation: 'get', 'list' or 'query' for read_db; 'set', 'update' or 'delete' for write_db, or 'batch' to send up to ${MAX_BATCH_WRITES} of those in `writes` under one approval. Required for both database actions; meaningless for every other action.
