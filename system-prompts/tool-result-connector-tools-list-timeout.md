<!--
name: 'Tool Result: Connector tools list timeout'
description: >-
  Reports that waiting for the connector's tool list timed out and advises
  retrying in a moment.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code waited for this connector's list of tools so that it could check this call, and that wait used up the call's timeout. Calling again in a moment may work.
