<!--
name: 'Tool Parameter: Artifact database operations summary'
description: >-
  Comprehensive summary of database read and write actions and required
  parameters.
ccVersion: 2.1.257
-->
Reads: 'get' (one document: `collection` + `doc_id`), 'list' (a page of a collection: `collection`, with optional `query.limit`/`query.cursor`), 'query' (filtered: `collection` + `query`). Writes: 'set' (replace) or 'update' (merge) with `collection`, `doc_id`, and either `data` or `file_path`; 'delete' with `collection` + `doc_id`; 'batch' with `writes`. Every action takes the artifact's `url`.
