<!--
name: 'Tool Result: Cloud session POST refused'
description: >-
  Reports that a POST request from the cloud session was refused with an HTTP
  error status.
ccVersion: 2.1.318
variables:
  - TARGET_HOST
  - HTTP_STATUS
  - DETAILS
-->
Nothing was sent to '${TARGET_HOST}': the post from this cloud session was refused (HTTP ${HTTP_STATUS}). ${DETAILS}
