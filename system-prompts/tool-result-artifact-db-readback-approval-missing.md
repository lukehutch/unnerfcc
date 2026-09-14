<!--
name: 'Tool Result: Artifact DB Readback Approval Missing'
description: >-
  Reports that a write requiring document readback has no approval record in the
  session and requests a retry.
ccVersion: 2.1.270
-->
this write reads back the stored document (a str_replace, or a write pinned with if_version) and has no approval record in this session — nothing was written; retry so it is checked again
