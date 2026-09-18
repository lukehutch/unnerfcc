<!--
name: 'Tool Result: upload_asset file_paths count limit'
description: >-
  Validation error stating file_paths must contain between 1 and the maximum
  allowed local file paths.
ccVersion: 2.1.277
variables:
  - MAX_FILE_PATHS
-->
`file_paths` must be a list of 1 to ${MAX_FILE_PATHS} local file paths
