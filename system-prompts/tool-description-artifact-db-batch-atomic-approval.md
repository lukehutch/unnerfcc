<!--
name: 'Tool Description: Artifact database batch write atomicity and approval'
description: >-
  Explains single approval and atomicity behavior for artifact database batch
  writes.
ccVersion: 2.1.273
-->
}` entries (no top-level `collection`/`doc_id`); the batch is one approval, applied atomically (all or nothing) where the server supports batches and otherwise one write at a time in order (the result says which), so prefer it over separate calls whenever you write more than a couple of documents. To remove a field, write it as `{"__delete__": true}` in an "update" (at any depth; rejected inside arrays); "set" rejects that value.
