<!--
name: 'Tool Result: File reference SHA-256 mismatch prefix'
description: >-
  Error prefix reporting that a file does not match the SHA-256 hash in its
  reference.
ccVersion: 2.1.318
variables:
  - FILE_PATH
  - REASON
-->
${FILE_PATH} doesn't match the SHA-256 in its reference, ${REASON} Compute its SHA-256 again (
