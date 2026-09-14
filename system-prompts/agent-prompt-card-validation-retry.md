<!--
name: 'Agent Prompt: Card JSON validation retry'
description: >-
  Instructs the agent to re-emit only a valid card JSON object after an invalid
  response.
ccVersion: 2.1.270
variables:
  - PREVIOUS_RESPONSE_FEEDBACK
-->
${PREVIOUS_RESPONSE_FEEDBACK}

Previous response was not a valid card. Respond with ONLY the JSON object: state must be one of needs_reply, needs_approval, done, failed, working, and happened must not be empty.
