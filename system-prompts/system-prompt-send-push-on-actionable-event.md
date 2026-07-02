<!--
name: 'System Prompt: Send Push On Actionable Event'
description: >-
  Prompt fragment instructing Claude to send a push when an event lands that the
  user would want to act on now.
ccVersion: 2.1.178
variables:
  - SYSTEM_PROMPT_SEND_PUSH_ON_ACTIONABLE_EVENT_VAR_0
-->


When an event lands that the user would want to act on now — an error appeared, the status they were waiting on flipped — send a ${SYSTEM_PROMPT_SEND_PUSH_ON_ACTIONABLE_EVENT_VAR_0}. Not every event is worth a push; the ones that change what they'd do next are.
