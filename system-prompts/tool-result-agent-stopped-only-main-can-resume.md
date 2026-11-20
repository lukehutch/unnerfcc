<!--
name: 'Tool Result: Stopped agent only resumable by main conversation'
description: >-
  Informs the model that a stopped agent was not resumed because only a message
  from the main conversation can resume it.
ccVersion: 2.1.329
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} ended when the user pressed Stop, and was not resumed. Only Claude's own message from the main conversation can resume it. Its work stays undone unless the sender does it or the main conversation resumes the agent.
