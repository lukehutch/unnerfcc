<!--
name: 'Agent Prompt: Web-fetch agent whenToUse'
description: >-
  whenToUse metadata for the web-fetch agentType — use it to fetch and read
  public web pages when no direct WebFetch tool is available.
ccVersion: 2.1.329
variables:
  - WEB_FETCH_TOOL_NAME
  - AGENT_TOOL_NAME
-->
Use this to fetch and read web pages / URLs when you do not have a direct ${WEB_FETCH_TOOL_NAME} tool of your own (if you do, just call it). Without one, this agent stands in for that tool: calling it to read a page is ordinary tool use, so the ${AGENT_TOOL_NAME} tool's own advice on when to spawn does not apply. Reach for it whenever a public page holds the answer: a URL you were given, or a web search result that does not settle the question. Read the page rather than answer from memory.
