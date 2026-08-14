<!--
name: 'Tool Parameter: Artifact database document fields'
description: >-
  data field of the artifact tool's write_db action — the JSON object of
  document fields, required for 'set' and 'update' and rejected with any other
  db_op.
ccVersion: 2.1.231
-->
Document fields to write, as a JSON object. Required for db_op 'set' (replaces the document) and 'update' (merges into it); not accepted with any other db_op.
