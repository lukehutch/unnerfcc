<!--
name: 'Tool Description: WebFetch Redirect Detected'
description: >-
  WebFetch tool_result when the URL redirects to a different host, instructing
  the model to re-fetch the redirect URL with the listed parameters.
ccVersion: 2.1.219
variables:
  - REDIRECT_STATUS_TEXT
-->
 ${REDIRECT_STATUS_TEXT}

To complete your request, I need to fetch content from the redirected URL. Please use WebFetch again with these parameters:
- url: "
