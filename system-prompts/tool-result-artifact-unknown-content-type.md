<!--
name: 'Tool Result: Artifact unknown content type for extension'
description: >-
  Validation error for files with unmapped extensions, suggesting renaming or
  specifying contentType.
ccVersion: 2.1.273
variables:
  - EXTENSION_REASON
  - SERVED_TYPES_LIST
  - DOCUMENT_ARCHIVE_GUIDANCE
-->
 (${EXTENSION_REASON}) — nothing was published. ${SERVED_TYPES_LIST} Rename a text or data file to one of these (.txt .json .csv), or make another file the `file_path` and list this one under `files` with contentType "text/plain". ${DOCUMENT_ARCHIVE_GUIDANCE}
