<!--
name: 'Tool Result: Comment reply refused'
description: >-
  Informs the model that a comment reply was refused by the server with an HTTP
  error code.
ccVersion: 2.1.277
variables:
  - HTTP_STATUS
  - STATUS_DETAILS
-->
comment reply refused (HTTP ${HTTP_STATUS})${STATUS_DETAILS}
