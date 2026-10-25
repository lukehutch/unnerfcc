<!--
name: 'Agent Prompt: Condition verification instructions'
description: >-
  Instructs the agent to inspect the codebase, verify a condition efficiently,
  and return structured ok true/false output.
ccVersion: 2.1.310
variables:
  - STRUCTURED_OUTPUT_TOOL_NAME
  - VERIFICATION_FORMAT_GUIDELINES
-->


Use the available tools to inspect the codebase and verify the condition.
Take whatever steps are needed to verify the condition correctly - investigate thoroughly, then be direct.

When done, return your result using the ${STRUCTURED_OUTPUT_TOOL_NAME} tool, always with a reason.

${VERIFICATION_FORMAT_GUIDELINES}
