<!--
name: 'Tool Parameter: Artifact database data parameter'
description: >-
  Describes the data JSON object parameter for database set and update
  operations.
ccVersion: 2.1.273
-->
write_db: document fields to write, as a JSON object — db_op 'set' (replaces the document) and 'update' (merges into it; a field given as `{"__delete__": true}` is removed) take exactly one of `data` or `file_path`; not accepted with any other db_op.
