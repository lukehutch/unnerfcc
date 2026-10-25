<!--
name: 'Tool Description: Connector needs reconnect guidance'
description: >-
  Model-facing guidance explaining how to handle connectors with needs_reconnect
  install state by calling the resolution tool with directoryUuid.
ccVersion: 2.1.310
variables:
  - RESOLVE_TOOL_NAME
-->
 enabledInChat: false with installState: "needs_reconnect" means the connector needs the user to sign in to it again; if the task needs it, call ${RESOLVE_TOOL_NAME} with its directoryUuid so the app can offer them a way to do that, and do not tell them to enable it for this chat.
