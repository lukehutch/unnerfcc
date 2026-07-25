<!--
name: 'System Prompt: Chrome connection failed'
description: >-
  Injected notice that the browser connection failed or was disabled so
  mcp__claude-in-chrome__* tools must not be attempted this session.
ccVersion: 2.1.219
-->
Claude in Chrome is enabled for this session, but the browser connection is not working (it failed or was disabled), so mcp__claude-in-chrome__* tools are not available. Do not attempt them. Continue the task without browser tools (WebFetch and WebSearch cover read-only web content), or ask the user to perform browser steps manually. The user can retry the connection with /chrome (Reconnect extension).
