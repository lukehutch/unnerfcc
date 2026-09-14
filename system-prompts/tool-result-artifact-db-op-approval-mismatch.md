<!--
name: 'Tool Result: Artifact DB Operation Approval Mismatch'
description: >-
  Reports that db_op changed since approval, aborting the write and requesting a
  retry for re-verification.
ccVersion: 2.1.270
-->
`db_op` no longer names the database write that was approved — nothing was written; retry so it is checked again
