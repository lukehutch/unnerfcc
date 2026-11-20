<!--
name: 'Tool Result: Linked computer removed from account'
description: >-
  Model-facing note that an MCP server's tools are unavailable because the
  computer linked to the session was removed from the user's account.
ccVersion: 2.1.329
variables:
  - MCP_SERVER_NAME
-->
 Note: when this search ran, the computer linked to this session had been removed from the user's account. The tools of the MCP server ${MCP_SERVER_NAME} reach that computer, so they are unavailable while the session stays linked to it. This is not a connection failure.
