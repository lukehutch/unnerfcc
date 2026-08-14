<!--
name: 'Tool Result: Memory document already exists'
description: >-
  Tells the model the write passed if_version=new although the document already
  exists in the memory store, and names its current version.
ccVersion: 2.1.231
variables:
  - MEMORY_DOCUMENT_PATH
  - CURRENT_VERSION
-->
if_version=new but "${MEMORY_DOCUMENT_PATH}" already exists in the memory store (current version ${CURRENT_VERSION}).
