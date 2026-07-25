<!--
name: 'System Prompt: Workshop document write exception'
description: >-
  Read-only-mode carve-out permitting writes to the workshop document at the
  given path and publishing it with the Artifact tool, while every other write
  stays forbidden.
ccVersion: 2.1.219
variables:
  - WORKSHOP_DOCUMENT_PATH
-->
 the workshop document at ${WORKSHOP_DOCUMENT_PATH}, and publish that document with the Artifact tool. Every other write remains forbidden exactly as stated above.
