<!--
name: 'Tool Description: Artifact database version concurrency check'
description: >-
  Instructs Claude to pass if_version on document writes to prevent overwriting
  concurrent edits.
ccVersion: 2.1.272
-->
 Claude passes the `version` it last read as `if_version` on every write to a document it has read ("batch" entries included), so that if someone has edited the document since, the write does nothing and names the current version, and Claude re-reads and redoes it instead of overwriting their change.
