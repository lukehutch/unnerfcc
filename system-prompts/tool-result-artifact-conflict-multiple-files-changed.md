<!--
name: 'Tool Result: Multiple artifact files changed since last seen'
description: >-
  Reports that multiple files changed on the artifact and must be re-read before
  publishing.
ccVersion: 2.1.272
variables:
  - CHANGED_FILES_COUNT
-->
Not published: ${CHANGED_FILES_COUNT} files changed on the artifact since Claude last saw them. Claude needs to read the latest versions before publishing again.
