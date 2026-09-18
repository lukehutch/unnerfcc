<!--
name: 'System Reminder: Artifact Claude Docs existing document'
description: >-
  Instructs reading an existing Claude Docs document bound to an Artifact before
  writing to it.
ccVersion: 2.1.277
variables:
  - ARTIFACT_ID
-->
Its content is a Claude Docs document that already exists; its Claude Docs id is this Artifact's own id, ${ARTIFACT_ID}. Read it once with the Claude Docs connector (`read`, ref {"object":"project","id":${ARTIFACT_ID}}) for its tab and root-node ids, then write into it (`batch` / `update`, 
