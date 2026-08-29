<!--
name: 'System Prompt: Remote service served by different client'
description: >-
  Notifies that a service or machine is now served by a different attached
  client.
ccVersion: 2.1.251
variables:
  - SERVICE_OR_MACHINE_NAME
  - TIMESTAMP
-->
- ${SERVICE_OR_MACHINE_NAME} is now served by a different attached client of this session than before (re-announced at ${TIMESTAMP} UTC).
