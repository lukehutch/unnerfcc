<!--
name: 'System Prompt: Chrome setup declined by user'
description: >-
  Injected notice that the user opted to continue without browser tools,
  forbidding further extension suggestions this session.
ccVersion: 2.1.219
-->
The user started installing the Claude in Chrome extension but chose to continue without browser tools. Do not suggest the extension again this session. Continue the task without browser tools (WebFetch and WebSearch cover read-only web content), or ask the user to perform browser steps manually. If they finish installing later, /chrome completes the connection, and the next Claude Code session detects the extension automatically.
