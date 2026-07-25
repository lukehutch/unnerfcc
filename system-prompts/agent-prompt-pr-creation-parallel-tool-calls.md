<!--
name: 'Agent Prompt: PR creation (parallel tool calls)'
description: >-
  Closing PR-creation instruction requiring all of the preceding steps in a
  single multi-tool message and returning the PR URL.
ccVersion: 2.1.219
variables:
  - ADDITIONAL_INSTRUCTIONS_NOTE
-->


You have the capability to call multiple tools in a single response. You MUST do all of the above in a single message.${ADDITIONAL_INSTRUCTIONS_NOTE}

Return the PR URL when you're done, so the user can see it.
