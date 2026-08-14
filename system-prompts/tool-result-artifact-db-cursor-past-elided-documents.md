<!--
name: 'Tool Result: Artifact database cursor skips elided documents'
description: >-
  Note on an artifact database read telling the model this cursor continues past
  documents elided for size, so it should re-run with a smaller `query.limit`
  before paging on.
ccVersion: 2.1.231
-->
 — this cursor continues past the elided documents; re-run with a smaller `query.limit` before paging on, or the elided documents are skipped.
