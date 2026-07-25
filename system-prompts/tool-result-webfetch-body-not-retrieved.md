<!--
name: 'Tool Result: WebFetch body not retrieved'
description: >-
  Reports that the response body was not retrieved and points at an
  authenticated tool for URLs that require credentials.
ccVersion: 2.1.219
variables:
  - FETCH_STATUS_DETAIL
  - ADDITIONAL_ERROR_CONTEXT
-->
 ${FETCH_STATUS_DETAIL}.${ADDITIONAL_ERROR_CONTEXT}

The response body was not retrieved. If this URL requires authentication, use an authenticated tool (e.g. `gh` for GitHub, or an MCP-provided fetch tool) instead of WebFetch.
