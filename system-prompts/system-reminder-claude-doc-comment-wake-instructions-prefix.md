<!--
name: 'System Reminder: Claude Doc comment wake instructions prefix'
description: >-
  Introduces comment wake notifications for Claude Docs and points to the Docs
  connector.
ccVersion: 2.1.318
variables:
  - DOC_NAME
  - REPLY_TOOL_NAME
  - CONNECTOR_TOOL_NAME
-->
A comment on the Claude Doc ${DOC_NAME} was sent to Claude. The thread this wake names is a resolved relay that does not show on the doc: a reply through ${REPLY_TOOL_NAME} stays on that relay and does not reach the doc. The doc's comments are in the Claude Docs connector. `${CONNECTOR_TOOL_NAME}` with ref 
