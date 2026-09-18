<!--
name: 'Tool Result: Artifact Claude Docs created content guidance'
description: >-
  Explains that Claude Docs content was created with the Artifact and instructs
  not creating it again or publishing files.
ccVersion: 2.1.277
variables:
  - PROJECT_ID
  - CONTAINER_INSTRUCTIONS
  - FOLLOW_UP_INSTRUCTIONS
-->
${PROJECT_ID}). Do not create it again: a connector `batch` whose container says `create` for this Artifact only repeats what creating the Artifact already did. ${CONTAINER_INSTRUCTIONS} Nothing is published to this URL for its content — never index.html or any of the type's files. ${FOLLOW_UP_INSTRUCTIONS}
