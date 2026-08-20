<!--
name: 'Tool Result: WebFetch unavailable, use the web-fetch agent'
description: >-
  No-such-tool error suffix telling the model WebFetch is not available directly
  in this context and that web pages are read by dispatching the web-fetch
  subagent type through the Agent tool instead.
ccVersion: 2.1.232
variables:
  - WEBFETCH_TOOL_NAME
  - AGENT_TOOL_NAME
  - WEB_FETCH_AGENT_TYPE
-->
. ${WEBFETCH_TOOL_NAME} is not available directly in this context — use the ${AGENT_TOOL_NAME} tool with subagent_type: "${WEB_FETCH_AGENT_TYPE}" to read web pages instead.
