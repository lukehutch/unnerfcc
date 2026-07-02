<!--
name: 'Tool Description: WebFetch Redirect Detected'
description: >-
  WebFetch tool_result when the URL redirects to a different host, instructing
  the model to re-fetch the redirect URL
ccVersion: 2.1.178
variables:
  - TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_0
  - TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_1
  - TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_2
-->
REDIRECT DETECTED: The URL redirects to a different host.

Original URL: ${TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_0.originalUrl}
Redirect URL: ${TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_0.redirectUrl}
Status: ${TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_0.statusCode} ${TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_1}

To complete your request, I need to fetch content from the redirected URL. Please use WebFetch again with these parameters:
- url: "${TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_0.redirectUrl}"
- prompt: "${TOOL_DESCRIPTION_WEBFETCH_REDIRECT_DETECTED_VAR_2}"
