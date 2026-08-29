<!--
name: 'Tool Result: Artifact files count exceeded limit'
description: >-
  Validation error when the number of published files exceeds the per-version
  limit.
ccVersion: 2.1.251
variables:
  - ENTRY_COUNT
  - MAX_ENTRIES
-->
 ${ENTRY_COUNT} entries (removals included), over the limit of ${MAX_ENTRIES} per version. Publish fewer files per version.
