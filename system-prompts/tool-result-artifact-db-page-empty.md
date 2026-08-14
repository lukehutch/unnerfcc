<!--
name: 'Tool Result: Artifact database page empty'
description: >-
  Reports that this page of the collection held no documents because the scan
  stopped before finding a match.
ccVersion: 2.1.231
variables:
  - COLLECTION_NAME
  - NEXT_PAGE_HINT
-->
No documents in this page of collection ${COLLECTION_NAME} — the scan stopped before finding a match.${NEXT_PAGE_HINT}
