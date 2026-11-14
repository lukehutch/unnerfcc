<!--
name: 'Tool Result: Connector call delivery uncertain'
description: >-
  Informs the model that it is unknown whether the connector received or ran the
  call, instructing it to tell the user before retrying.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
-->
It is not known whether the connector received the call to ${TOOL_NAME}, so it is not known whether ${TOOL_NAME} ran. No file was sent. Tell the user before calling it again.
