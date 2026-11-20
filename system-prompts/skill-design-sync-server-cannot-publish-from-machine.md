<!--
name: 'Skill: /design-sync server cannot publish from machine'
description: >-
  States that the Artifacts MCP server is connected and /mcp and /permissions
  look fine, but this session cannot publish files from this machine yet.
ccVersion: 2.1.329
variables:
  - MCP_SERVER_NAME
-->
The ${MCP_SERVER_NAME} server is connected and its tools are here, but this session cannot publish files from this machine through them yet. /mcp and /permissions show nothing wrong. They can start a new session and run /design-sync again; if it stops here again, the cause is most likely on Anthropic's side.
