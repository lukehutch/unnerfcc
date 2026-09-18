<!--
name: 'Tool Result: upload_asset path too long for batch approval'
description: >-
  Explains that a file path exceeding character limits must be uploaded
  individually with file_path.
ccVersion: 2.1.277
variables:
  - MAX_PATH_LENGTH
-->
this path is longer than ${MAX_PATH_LENGTH} characters, as written or as an absolute path, which is more than an approval can show in full — upload that file by itself with `file_path`.
