<!--
name: 'Tool Result: Memory document over the byte cap'
description: >-
  Refuses an oversized memory document, giving its size and the per-document cap
  and telling the model to split it into smaller documents.
ccVersion: 2.1.231
variables:
  - CONTENT_BYTES
  - MAX_DOCUMENT_BYTES
-->
Content is ${CONTENT_BYTES} bytes; a memory document is capped at ${MAX_DOCUMENT_BYTES} bytes. Split it into smaller documents.
