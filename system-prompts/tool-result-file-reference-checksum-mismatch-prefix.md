<!--
name: 'Tool Result: File Reference Checksum Mismatch Prefix'
description: >-
  Prefix reporting that file content did not match the provided SHA-256
  checksum.
ccVersion: 2.1.310
variables:
  - FILE_PATH
-->
${FILE_PATH} doesn't match the SHA-256 in the reference, so nothing was uploaded. Compute its SHA-256 again (
