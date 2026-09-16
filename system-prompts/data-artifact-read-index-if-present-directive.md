<!--
name: 'Data: Artifact read index if present directive'
description: >-
  Directs reading the artifact index file if present before making file
  modifications.
ccVersion: 2.1.273
variables:
  - INDEX_FILE_NAME
-->
) and read `${INDEX_FILE_NAME}` if it is among them before writing anything; if it is files, read each one you will change (
