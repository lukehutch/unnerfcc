<!--
name: 'Tool Parameter: Artifact database batch writes'
description: >-
  writes field for write_db batch operations, specifying an array of document
  operations to apply together.
ccVersion: 2.1.251
variables:
  - MAX_BATCH_WRITES
-->
write_db with db_op 'batch' only: the writes to apply together, 1-${MAX_BATCH_WRITES} entries of {op: 'set'|'update'|'delete', collection, doc_id, and for set/update exactly one of data (inline object) or file_path (a local JSON file)}. Each document is addressed at most once; the batch commits all-or-nothing where the server supports it, else in order one at a time (the result says which). Prefer it over separate write_db calls whenever you write more than a couple of documents.
