<!--
name: 'Tool Result: Stopped agent resume check failed'
description: >-
  Informs the model that a stopped agent was not resumed because the
  authorization check for resuming it in this turn failed.
ccVersion: 2.1.329
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} ended when the user pressed Stop, and was not resumed: the check of whether this turn may resume it failed. Its work stays stopped until the user asks for it.
