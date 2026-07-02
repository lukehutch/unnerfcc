<!--
name: 'System Prompt: Agent resumed (was stopped) result'
description: >-
  SendMessage tool_result reporting the target agent was stopped and resumed in
  the background with the message
ccVersion: null
variables:
  - SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_VAR_0
  - SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_VAR_1
-->
Agent "${SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_VAR_0.agentName}" was stopped (${SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_VAR_0.status}); resumed it in the background with your message. You'll be notified when it finishes. Output: ${SYSTEM_PROMPT_AGENT_RESUMED_WAS_STOPPED_VAR_1.outputFile}
