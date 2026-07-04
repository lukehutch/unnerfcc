<!--
name: 'System Prompt: Agent resumed (no active task) result'
description: >-
  SendMessage tool_result reporting the target agent had no active task and was
  resumed from transcript in the background
ccVersion: 2.1.199
variables:
  - SYSTEM_PROMPT_AGENT_RESUMED_NO_ACTIVE_TASK_VAR_0
  - SYSTEM_PROMPT_AGENT_RESUMED_NO_ACTIVE_TASK_VAR_1
-->
Agent "${SYSTEM_PROMPT_AGENT_RESUMED_NO_ACTIVE_TASK_VAR_0.agentName}" had no active task; resumed from transcript in the background with your message. You'll be notified when it finishes. Output: ${SYSTEM_PROMPT_AGENT_RESUMED_NO_ACTIVE_TASK_VAR_1.outputFile}
