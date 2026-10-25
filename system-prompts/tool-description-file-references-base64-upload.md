<!--
name: 'Tool Description: File references for base64 content upload'
description: >-
  Instructs setting base64Content to a sha256 file reference instead of raw
  base64 data.
ccVersion: 2.1.310
-->
FILE REFERENCES: to upload a file you can read here, don't type its base64; set base64Content to a file reference, sha256:<64 lowercase hex>:<its absolute path, with / between folders>. The app fills in the file's content once the user approves the call.
