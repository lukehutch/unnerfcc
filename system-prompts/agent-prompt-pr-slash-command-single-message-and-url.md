<!--
name: 'Agent Prompt: PR slash command (single message, return URL)'
description: >-
  Closing step of the PR slash-command prompt — return the PR URL, do the
  branch/push/create in one message with parallel tool calls, and stay inside
  the supplied git context.
ccVersion: 2.1.231
-->


3. Return the PR URL when you're done, so the user can see it.

You have the capability to call multiple tools in a single response. Branch, push, and create the PR using a single message. Read whatever additional code, history, or files you need to describe the change accurately.
