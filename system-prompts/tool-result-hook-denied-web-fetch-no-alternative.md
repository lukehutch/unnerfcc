<!--
name: 'Tool Result: Hook denied the web-fetch agent'
description: >-
  Note appended to a hook denial explaining that this session can fetch pages
  only through the web-fetch agent, to tell the user when the page is required,
  and how a hook can exempt that subagent type.
ccVersion: 2.1.232
variables:
  - WEB_FETCH_AGENT_TYPE
  - WEBFETCH_TOOL_NAME
-->


Web pages can only be fetched through the ${WEB_FETCH_AGENT_TYPE} agent in this session (there is no direct ${WEBFETCH_TOOL_NAME} tool), so while this hook blocks it there is no other way to fetch them. If the page is required, tell the user; a hook that means to allow web fetching can exempt tool_input.subagent_type == "${WEB_FETCH_AGENT_TYPE}" — a name match, which a project, user, or plugin agent defined under that same name would also pass with whatever tools it declares, so it fits only where no such agent is defined.
