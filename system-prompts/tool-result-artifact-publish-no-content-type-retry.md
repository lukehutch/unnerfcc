<!--
name: 'Tool Result: Artifact publish no contentType retry prompt'
description: >-
  Advises retrying artifact publication with served types when a file lacks
  contentType and extension.
ccVersion: 2.1.273
variables:
  - NO_EXTENSION_REASON
  - SERVED_TYPES_LIST
  - TEXT_FILE_GUIDANCE
  - DOCUMENT_ARCHIVE_GUIDANCE
-->
 (no contentType, and ${NO_EXTENSION_REASON}) — nothing was published. ${SERVED_TYPES_LIST} Publish again with every file as a served type. ${TEXT_FILE_GUIDANCE} ${DOCUMENT_ARCHIVE_GUIDANCE}
