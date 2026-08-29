<!--
name: 'System Prompt: Plugin between-turns message'
description: >-
  Surfaces a message submitted by a plugin between turns starting the turn in
  the user's place.
ccVersion: 2.1.251
variables:
  - PLUGIN_NAME
  - MESSAGE
-->
The ${PLUGIN_NAME} plugin sent a message:
${MESSAGE}

This is how Claude Code surfaces a prompt a plugin submits between turns — it starts this turn in the user's place. Address the message above.
