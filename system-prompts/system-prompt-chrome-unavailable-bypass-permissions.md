<!--
name: 'System Prompt: Chrome unavailable (bypass permissions mode)'
description: >-
  Injected notice that browser tools were not enabled because the session
  switched to bypass-permissions mode during setup.
ccVersion: 2.1.219
-->
Browser tools were not enabled: the session switched to a mode that auto-allows tool calls without prompts (bypass permissions) while setup was in progress, and Claude in Chrome is not wired into that configuration. Continue the task without browser tools (WebFetch and WebSearch cover read-only web content), or ask the user to perform browser steps manually. Once the session leaves that mode, /chrome completes the connection.
