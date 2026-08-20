<!--
name: 'Tool Result: WebFetch unavailable and the web-fetch agent is not allowed here'
description: >-
  No-such-tool error suffix telling the model WebFetch is unavailable and the
  web-fetch agent falls outside this session's allowed subagent types, so a
  required page should be raised with the user.
ccVersion: 2.1.232
variables:
  - WEBFETCH_TOOL_NAME
  - WEB_FETCH_AGENT_TYPE
-->
. ${WEBFETCH_TOOL_NAME} is not available in this context, and the ${WEB_FETCH_AGENT_TYPE} agent that reads web pages for this session is outside this session's allowed subagent types. If the page is required, tell the user.
