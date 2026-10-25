<!--
name: 'Tool Result: Resume Agent Directory Invalid'
description: >-
  Reports that the agent cannot be resumed in the recorded directory and directs
  starting a new agent.
ccVersion: 2.1.310
variables:
  - DIRECTORY_ERROR
-->
Cannot resume this agent in the directory its record names: ${DIRECTORY_ERROR}. Start a new agent instead.
