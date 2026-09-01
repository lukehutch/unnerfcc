<!--
name: 'Tool Parameter: Artifact database out_dir parameter'
description: >-
  Describes the out_dir parameter for saving database query results to local
  JSON files.
ccVersion: 2.1.257
-->
get, list and query: when given, each returned document is written as pretty-printed JSON to <out_dir>/<collection path>/<doc_id>.json (directories created as needed) and the result lists the files instead of the document contents — use it for large documents or many of them.
