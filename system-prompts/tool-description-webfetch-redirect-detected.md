<!--
name: 'Tool Description: WebFetch Redirect Detected'
description: >-
  WebFetch tool_result when the URL redirects to a different host, instructing
  the model to re-fetch the redirect URL with the listed parameters.
ccVersion: 2.1.232
variables:
  - WEB_FETCH_TOOL_NAME
  - REDIRECT_URL
  - FETCH_PROMPT
-->
To complete your request, I need to fetch content from the redirected URL. Please use ${WEB_FETCH_TOOL_NAME} again with these parameters:
- url: "${REDIRECT_URL}"
- prompt: "${FETCH_PROMPT}"
