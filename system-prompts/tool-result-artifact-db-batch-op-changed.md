<!--
name: 'Tool Result: Artifact database batch op changed after approval'
description: >-
  Error reporting that a batch write operation changed after approval, requiring
  a retry.
ccVersion: 2.1.277
variables:
  - WRITE_INDEX
-->
`writes[${WRITE_INDEX}].op` changed after this batch was approved — nothing was written; retry so it is checked again
