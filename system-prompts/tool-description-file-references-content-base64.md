<!--
name: 'Tool Description: File references for contentBase64'
description: >-
  Model-facing instruction to pass a sha256 file reference in contentBase64
  instead of typing raw base64.
ccVersion: 2.1.329
-->
FILE REFERENCES: to save a file you can read here, don't type its base64; set contentBase64 to a file reference, sha256:<64 lowercase hex>:<its absolute path, with / between folders>. The app fills in the file's content when the call runs.
