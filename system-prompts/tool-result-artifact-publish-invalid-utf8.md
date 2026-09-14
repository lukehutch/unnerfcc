<!--
name: 'Tool Result: Artifact Publish Invalid UTF-8'
description: >-
  Reports that the source file contains invalid UTF-8 bytes and instructs
  rewriting as UTF-8 before publishing.
ccVersion: 2.1.270
variables:
  - BYTE_OFFSET
  - REPUBLISH_INSTRUCTION
-->
 text (first invalid byte at ${BYTE_OFFSET}). It may be saved in another encoding or contain binary data. Rewrite it as UTF-8, ${REPUBLISH_INSTRUCTION}
