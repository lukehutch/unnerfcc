<!--
name: 'Tool Result: Connector tools list pending'
description: >-
  Informs the model that the connector's tool list has not arrived yet to check
  argument safety, advising a brief retry.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: this connector's list of tools had not arrived, so Claude Code could not tell whether this call would send a path as plain text. Calling again in a moment may work.
