<!--
name: 'System Reminder: Mid-turn user message'
description: >-
  Explains that the user's message arrived inside the running turn, often
  alongside a tool result, and should be addressed while continuing the turn.
ccVersion: 2.1.219
variables:
  - MESSAGE_HEADER
  - USER_MESSAGE
-->
${MESSAGE_HEADER}${USER_MESSAGE}

This is how Claude Code surfaces messages the user sends mid-turn — within the running turn, often alongside the next tool result, rather than as a separate conversation turn. Address the message above as you continue this turn.
