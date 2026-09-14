<!--
name: 'Tool Result: Artifact DB if_version Approval Mismatch'
description: >-
  Reports that if_version changed since approval, aborting the write and
  requesting a retry.
ccVersion: 2.1.270
-->
`if_version` no longer matches the database write that was approved — nothing was written; retry so it is checked again
