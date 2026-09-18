<!--
name: 'Tool Result: Quickstart Docs type fallback without connector'
description: >-
  Explains fallback behavior for document creation when the Claude Docs
  connector is not attached.
ccVersion: 2.1.277
variables:
  - PREFIX_NOTE
  - CONNECTOR_DESCRIPTION
  - FALLBACK_ACTION
-->
${PREFIX_NOTE} The rest applies when the host has attached ${CONNECTOR_DESCRIPTION}. ${FALLBACK_ACTION} instead, since a Docs type cannot be filled without the connector.
