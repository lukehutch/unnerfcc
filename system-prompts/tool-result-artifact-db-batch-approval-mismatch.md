<!--
name: 'Tool Result: Artifact DB Batch Approval Mismatch'
description: >-
  Reports that batch write entries changed since approval, aborting the batch
  and requesting a retry.
ccVersion: 2.1.270
-->
this batch no longer lists the writes that were approved (entries were added or removed) — nothing was read or sent; retry so it is checked again
