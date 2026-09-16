<!--
name: 'Tool Parameter: Artifact database data parameter'
description: >-
  Describes the data JSON object parameter for database set and update
  operations.
ccVersion: 2.1.273
-->
set and update: the document fields to write, as a JSON object — pass exactly one of `data` or `file_path`. In an update, a field given as `{"__delete__": true}` is removed instead.
