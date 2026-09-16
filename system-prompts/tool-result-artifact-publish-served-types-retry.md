<!--
name: 'Tool Result: Artifact publish served types retry prompt'
description: >-
  Prompt instructing the model to retry publishing with every file matching a
  served type.
ccVersion: 2.1.273
variables:
  - CONTENT_TYPE_DETAILS
  - SERVED_TYPES_LIST
  - TEXT_FILE_GUIDANCE
  - DOCUMENT_ARCHIVE_GUIDANCE
-->
${CONTENT_TYPE_DETAILS}). ${SERVED_TYPES_LIST} Publish again with every file as a served type. ${TEXT_FILE_GUIDANCE} ${DOCUMENT_ARCHIVE_GUIDANCE}
