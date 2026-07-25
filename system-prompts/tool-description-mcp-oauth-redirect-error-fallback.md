<!--
name: 'Tool Description: OAuth redirect error fallback'
description: >-
  Tells the model to ask the user to paste the full address-bar URL and pass it
  to the callback tool when the browser shows a connection error on the redirect
  page.
ccVersion: 2.1.219
variables:
  - OAUTH_CALLBACK_TOOL_NAME
-->


If the browser shows a connection error on the redirect page, ask the user to paste the full URL from the address bar and call `${OAUTH_CALLBACK_TOOL_NAME}` with it.
