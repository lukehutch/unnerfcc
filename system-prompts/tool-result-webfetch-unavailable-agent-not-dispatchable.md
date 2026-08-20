<!--
name: 'Tool Result: WebFetch and its web-fetch agent are both out of reach'
description: >-
  No-such-tool error suffix telling a nested agent that WebFetch is unavailable
  and this session's web-fetch agent cannot be dispatched from here, so a
  required page should be named in its report for the caller to fetch.
ccVersion: 2.1.232
variables:
  - WEBFETCH_TOOL_NAME
  - WEB_FETCH_AGENT_TYPE
-->
. ${WEBFETCH_TOOL_NAME} is not available in this context, and the ${WEB_FETCH_AGENT_TYPE} agent that reads web pages for this session cannot be dispatched from here (this agent's nesting depth or allowed subagent types rule it out). If the page is required, say so in your report so the caller can fetch it.
