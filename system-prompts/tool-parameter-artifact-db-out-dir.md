<!--
name: 'Tool Parameter: Artifact database read_db out_dir'
description: >-
  Describes out_dir parameter for read_db to write returned documents to JSON
  files on disk.
ccVersion: 2.1.251
-->
read_db: when given, each returned document is written as pretty-printed JSON to <out_dir>/<collection path>/<doc_id>.json (directories created as needed) and the result lists the files instead of the document contents — use it for large documents or many of them.
