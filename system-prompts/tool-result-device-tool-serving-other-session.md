<!--
name: 'Tool Result: Device serves a different cloud session'
description: >-
  Tells the model a device tool was refused because the user's machine is
  connected on behalf of another Claude Code cloud session so nothing ran, to
  tell the user and continue with this environment's tools, and not to retry in
  a loop.
ccVersion: 2.1.231
variables:
  - DEVICE_TOOL_NAME
-->
${DEVICE_TOOL_NAME} refused: the user's machine is currently connected on behalf of a different Claude Code cloud session (usually another session started from the same machine), so it cannot run device tools for this session and nothing was run. Tell the user, and continue with the tools in this cloud environment; if this session was also started with Claude Code on that machine, its device tools may work again once the other session ends. Do not retry in a loop.
