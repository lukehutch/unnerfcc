<!--
name: 'Tool Result: Memory document changed since the last read'
description: >-
  Tells the model the memory document changed since it last read it, naming the
  stale if_version token and the document's current version.
ccVersion: 2.1.231
variables:
  - DOCUMENT_PATH
  - STALE_VERSION_TOKEN
  - CURRENT_VERSION_TOKEN
-->
"${DOCUMENT_PATH}" changed since you last read it (if_version ${STALE_VERSION_TOKEN} is stale; current version ${CURRENT_VERSION_TOKEN}).
