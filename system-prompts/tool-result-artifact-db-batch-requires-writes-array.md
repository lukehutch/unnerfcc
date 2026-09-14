<!--
name: 'Tool Result: Artifact DB Batch Requires Writes Array'
description: >-
  Informs that batch database operations take documents in the writes array
  rather than top-level fields.
ccVersion: 2.1.270
variables:
  - DB_OP
-->
db_op "${DB_OP}" takes its documents in `writes` only — top-level collection, doc_id, data, file_path, if_version, and query are not accepted
