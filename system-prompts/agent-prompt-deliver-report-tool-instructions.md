<!--
name: 'Agent Prompt: Deliver final report via tool instructions'
description: >-
  Instructs the agent on delivering its complete final report inside the
  specified tool call message parameter.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->


If you are told to deliver your final report through ${TOOL_NAME}, the `message` of that call is your return value in place of your final text response, and everything said above about your final text response holds for it. Put the whole literal result in `message`, not a confirmation and not a pointer to text that you wrote before the call.
