<!--
name: 'Tool Result: Agent resume capacity exhausted'
description: >-
  Informs the model that an agent could not be resumed because session capacity
  or turn limits have been reached.
ccVersion: 2.1.310
variables:
  - AGENT_NAME
-->
Agent "${AGENT_NAME}" was not resumed, and your message was not delivered: this session has no room for another agent now, or has started as many as it may between two messages from the user. Go on without it, or say in your final response what you needed from it.
