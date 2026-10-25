<!--
name: 'Tool Result: File Reference Error Fix and Retry'
description: >-
  Reports an error with file reference arguments and directs fixing it before
  retrying.
ccVersion: 2.1.310
variables:
  - ERROR_REASON
-->
 call names a file by reference but ${ERROR_REASON}, so nothing was uploaded. Fix that and make the call again.
