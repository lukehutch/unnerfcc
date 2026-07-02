<!--
name: 'Context Tip Situation: MCP CLI Login'
description: >-
  Situation description fed to the tip classifier for proposing the MCP CLI
  login flow over SSH.
ccVersion: 2.1.195
-->
An MCP server that needs authentication is failing — Claude or the MCP status shows it as unauthenticated / needs login / token expired — and the user is working over SSH or otherwise cannot complete the browser OAuth flow from this terminal. They may have tried /mcp and hit "could not open browser", or mention they are on a remote box. IMPORTANT: Do NOT match MCP errors unrelated to auth (server not found, bad config), or when the user is on a local desktop where the /mcp browser flow works.
