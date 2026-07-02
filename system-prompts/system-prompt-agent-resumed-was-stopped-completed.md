<!--
name: Agent Resumed (Was Stopped) Completed Result
description: >-
  sendMessage tool-result message returned to the model when a stopped target
  agent was resumed with the user's message and ran to completion synchronously,
  carrying its final text.
ccVersion: null
variables:
  - SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_COMPLETED_VAR_0
  - SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_COMPLETED_VAR_1
-->
Agent "${SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_COMPLETED_VAR_0.agentName}" was stopped (${SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_COMPLETED_VAR_0.status}); resumed it with your message and ran to completion. Result:

${SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_COMPLETED_VAR_1.finalText||"(no text output)"}
