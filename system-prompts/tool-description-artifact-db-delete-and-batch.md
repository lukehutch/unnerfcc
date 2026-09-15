<!--
name: 'Tool Description: Artifact database delete and batch writes'
description: Describes delete and batch write operations for the artifact database.
ccVersion: 2.1.272
variables:
  - MAX_BATCH_WRITES
-->
 "delete" removes one, and "batch" applies up to ${MAX_BATCH_WRITES} writes listed in `writes` (with no top-level `collection` or `doc_id`) under one approval; Claude prefers a batch whenever it writes more than a couple of documents.
