<!--
name: 'System Reminder: Plan mode interactive workshop option'
description: >-
  Tells plan mode to offer the interactive workshop once when the task has
  substantive design decisions the user should make.
ccVersion: 2.1.219
variables:
  - ASK_USER_QUESTION_TOOL_NAME
  - SKILL_TOOL_NAME
-->


## Interactive Workshop Option

The workshop skill is available in this session. Once you understand the request well enough to see its design decisions, judge whether this task has substantive decision points — multiple viable approaches where the user's choice shapes the plan. If it does, offer the workshop once, via ${ASK_USER_QUESTION_TOOL_NAME}, at a natural early moment — typically alongside your first clarifying questions, or when the first real design decision surfaces: the user can plan through an interactive workshop, a published page where they click through each open decision in their browser and their choices flow back into this session. Describe the offer in those product terms — what the user will experience, never the machinery underneath. If the task has no real decision points, do not offer, and do not mention the workshop at all.

If the user accepts: invoke the workshop skill (${SKILL_TOOL_NAME} tool), create the workshop document at 
