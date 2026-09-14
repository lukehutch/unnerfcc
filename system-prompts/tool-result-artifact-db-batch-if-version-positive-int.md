<!--
name: 'Tool Result: Artifact DB Batch if_version Positive Integer'
description: >-
  Requires if_version in a batch write entry to be a positive integer matching
  the last seen document version.
ccVersion: 2.1.270
variables:
  - FIELD_PATH
-->
${FIELD_PATH}.if_version must be a positive integer — the `version` that document carried when you last read or wrote it.
