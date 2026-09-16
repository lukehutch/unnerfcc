<!--
name: 'Tool Result: Artifact unsupported file type can omit'
description: >-
  Reports that a file type cannot be included in artifacts, suggesting
  converting or omitting it.
ccVersion: 2.1.273
variables:
  - FILE_NAME
-->
Not published: ${FILE_NAME} is a type of file artifacts can't include. Claude can convert it or leave it out and publish again.
