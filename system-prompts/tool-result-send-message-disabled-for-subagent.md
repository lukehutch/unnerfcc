<!--
name: 'Tool Result: SendMessage disabled for subagent'
description: >-
  Informs a subagent that SendMessage is disabled or stopped and instructs
  placing output in the final response.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
-->
Not sent. You cannot use ${TOOL_NAME} in this session: it is switched off for subagents, or you were stopped. Put what you need to pass on in your final response, which goes to whoever launched or resumed you.
