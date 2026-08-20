<!--
name: 'Tool Result: Memory document path cannot be created'
description: >-
  Tells the model the requested memory document path cannot be created because a
  document and a prefix of its path cannot coexist, and to choose a different
  path.
ccVersion: 2.1.231
variables:
  - REQUESTED_DOCUMENT_PATH
  - PATH_CONFLICT_REASON
-->
"${REQUESTED_DOCUMENT_PATH}" cannot be created: ${PATH_CONFLICT_REASON}. A document and a prefix of its path cannot coexist — choose a different path.
