<!--
name: 'Tool Result: Artifact database full prune guidance'
description: >-
  Warns that the artifact database is full and instructs pruning or aggregating
  documents.
ccVersion: 2.1.263
variables:
  - PREFIX
-->
${PREFIX} It is full: writes that create a document will fail until some are deleted — prune or aggregate existing documents.
