<!--
name: 'Tool Result: Uploaded asset is durable and readable by every viewer'
description: >-
  Tail of the artifact asset-upload result — everyone who can open the artifact
  can load the file, and the upload is durable until deleted.
ccVersion: 2.1.251
variables:
  - FILE_INFO
  - ASSET_URL
-->
${FILE_INFO}) ${ASSET_URL} Everyone who can open the artifact can load this file; the upload is durable until deleted with action "delete_asset".
