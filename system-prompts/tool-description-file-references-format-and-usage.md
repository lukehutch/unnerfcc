<!--
name: 'Tool Description: File references format and usage'
description: >-
  Explains how to attach readable files using SHA-256 reference strings instead
  of base64 data.
ccVersion: 2.1.318
-->
FILE REFERENCES: to attach a file you can read here, don't type its base64; set the attachment's content to a file reference, sha256:<64 lowercase hex>:<its absolute path, with / between folders>, and set filename to the file's name. The app fills in the file's content once the user approves the call. An update_draft call removes a draft's files, so to change a draft that has files, make a new draft with the same files.
