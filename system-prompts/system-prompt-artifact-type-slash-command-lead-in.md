<!--
name: 'System Prompt: Artifact type slash command lead-in'
description: >-
  Lead-in indicating that a slash command was invoked to create a new artifact
  from a published type.
ccVersion: 2.1.310
variables:
  - COMMAND_NAME
  - DELIVERABLE_DESCRIPTION
  - ARTIFACT_TYPE_TITLE
-->
`/${COMMAND_NAME}` was invoked: a request for ${DELIVERABLE_DESCRIPTION} made as a NEW Artifact from the published Artifact type titled "${ARTIFACT_TYPE_TITLE}". 
