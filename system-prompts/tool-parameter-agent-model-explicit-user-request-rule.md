<!--
name: 'Tool Parameter: Model override explicit user request rule'
description: >-
  Instructs the model to only set model override when explicitly requested by
  the user.
ccVersion: 2.1.251
-->
 Set this only when EXPLICITLY asked by the user for a specific model, never because the task seems small, simple, or cheap; otherwise omit it so the worker uses the default (the session model, unless a default subagent model is configured).
