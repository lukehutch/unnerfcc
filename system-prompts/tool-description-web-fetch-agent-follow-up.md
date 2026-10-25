<!--
name: 'Tool Description: Web-fetch agent follow-up guidance'
description: >-
  Advises sending follow-up questions about previously fetched pages to the
  existing agent via SendMessage instead of spawning a new one.
ccVersion: 2.1.310
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
 It stays addressable after it finishes: send follow-up questions about pages it has already read via ${SEND_MESSAGE_TOOL_NAME} instead of spawning a new one for the same page.
