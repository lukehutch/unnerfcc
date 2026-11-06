<!--
name: 'Tool Description: Background work delegation advice'
description: >-
  Explains how long-running tasks can be handed off to a background agent
  executing foreground commands.
ccVersion: 2.1.318
variables:
  - AGENT_TOOL_NAME
-->
 Work that must go on after your reply can instead run in a background agent that runs its commands in the foreground (if you are a background agent, run them here in the foreground); the ${AGENT_TOOL_NAME} tool's description says how.
