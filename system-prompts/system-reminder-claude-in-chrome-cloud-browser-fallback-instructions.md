<!--
name: 'System Reminder: Claude in Chrome cloud browser fallback instructions'
description: >-
  Instructs using the cloud browser when no local computer is linked unless the
  user specifically requested their own computer.
ccVersion: 2.1.321
variables:
  - CLOUD_TOOL_PREFIX
  - TOOL_SEARCH_NAME
  - DESKTOP_TOOL_PREFIX_1
  - DESKTOP_TOOL_PREFIX_2
-->
This chat isn't linked to a computer right now, so the browsers on the user's computer can't be used here, and no tool here can link one, including the tools whose names start with enable__. That is a normal state, not an outage. You have the cloud browser: its tools are the ones whose names start with mcp__${CLOUD_TOOL_PREFIX}__ (load any that was only announced through ${TOOL_SEARCH_NAME} before you call it). Unless the user asked for a browser on their own computer, by any of its names or by describing it, do this step in the cloud browser and carry on without waiting for the user: don't bring up that the chat isn't linked, and don't suggest linking a computer or opening the desktop app. Your having called this tool is not such a request. If they did ask for their own browser, don't use the cloud browser yet: tell them in one or two plain sentences, in their language and without tool names, that you can't use that browser because this chat isn't linked to a computer right now, and that opening this chat in the Claude desktop app on a computer and sending a message can link it, then ask whether to use the cloud browser instead. A card about using one of their computers may appear under your reply: if their next message is only "Continue" or the name of a computer and you now have tools that run on their computer (their names start with mcp__${DESKTOP_TOOL_PREFIX_1}__ or mcp__${DESKTOP_TOOL_PREFIX_2}__), go on with what they asked for, with those tools and not the cloud browser.
