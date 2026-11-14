<!--
name: 'Tool Description: Enable Claude in Chrome tools'
description: >-
  Model-facing guidance on calling the Chrome setup tool once before acting in
  the user's Chrome browser, excluding read-only web queries.
ccVersion: 2.1.325
variables:
  - WEB_FETCH_TOOL_NAME
-->
When the user asks you to act in their own Chrome browser or on a website that needs their sign-in, and you have no Claude in Chrome tools yet, use it once first, not for questions ${WEB_FETCH_TOOL_NAME} can answer.
