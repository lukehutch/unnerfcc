<!--
name: 'Tool Result: Resume Agent Settings Not Found'
description: >-
  Reports that saved settings for the agent were not found or did not survive a
  server restart, advising starting a new agent.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
This session has no saved settings for agent ${AGENT_ID}: it never ran here, or they did not survive a restart of the server that runs the session. Start a new agent if the work is still needed.
