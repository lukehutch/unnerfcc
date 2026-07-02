<!--
name: Relevant Memories Retrieved Reminder
description: >-
  Model-facing system-reminder (relevant_memories case in the L6l registry,
  injected via pp([Mn({content,isMeta:!0})])) that prefaces recalled memories
  with a relevance caveat before showing the memory body.
ccVersion: 2.1.191
variables:
  - SYSTEM_REMINDER_RELEVANT_MEMORIES_RETRIEVED_VAR_0
  - SYSTEM_REMINDER_RELEVANT_MEMORIES_RETRIEVED_VAR_1
  - SYSTEM_REMINDER_RELEVANT_MEMORIES_RETRIEVED_VAR_2
-->
${SYSTEM_REMINDER_RELEVANT_MEMORIES_RETRIEVED_VAR_0===0?`Retrieved for possible relevance — use only if it actually applies to what the user asked.

`:""}${SYSTEM_REMINDER_RELEVANT_MEMORIES_RETRIEVED_VAR_1}

${SYSTEM_REMINDER_RELEVANT_MEMORIES_RETRIEVED_VAR_2.content}
