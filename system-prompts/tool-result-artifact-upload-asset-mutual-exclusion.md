<!--
name: 'Tool Result: upload_asset file_path and file_paths mutually exclusive'
description: >-
  Validation error stating upload_asset takes either file_path or file_paths,
  not both.
ccVersion: 2.1.277
-->
action "upload_asset" takes `file_path` (one file) or `file_paths` (several), not both.
