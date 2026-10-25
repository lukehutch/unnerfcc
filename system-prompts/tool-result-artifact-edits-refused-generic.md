<!--
name: 'Tool Result: Artifact edits refused with reason'
description: >-
  Reports that edits to the specified file were refused with the given error
  reason.
ccVersion: 2.1.310
variables:
  - FILE_PATH
  - REASON
-->
Refusing to apply edits to ${FILE_PATH}: ${REASON}
