<!--
name: 'Tool Result: Memory write version token invalid (new path)'
description: >-
  Rejects a memory write whose if_version is not a version token and tells the
  model to pass if_version=new because the document does not exist yet.
ccVersion: 2.1.231
variables:
  - VERSION_TOKEN_GUIDANCE
  - DOCUMENT_PATH
-->
${VERSION_TOKEN_GUIDANCE} "${DOCUMENT_PATH}" does not exist yet, so pass if_version=new to create it.
