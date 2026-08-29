<!--
name: 'Tool Result: No OAuth flow in progress suffix'
description: >-
  Suffix instructing the assistant to start the OAuth flow before retrying with
  a callback URL.
ccVersion: 2.1.251
variables:
  - OAUTH_START_TOOL_NAME
-->
. Call `${OAUTH_START_TOOL_NAME}` first, then retry with the callback URL.
