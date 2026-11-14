<!--
name: 'Tool Description: List claude.ai skills usage guidance'
description: >-
  Model-facing guidance on when to list enabled claude.ai skills versus
  recommending new skills via discovery tools.
ccVersion: 2.1.325
variables:
  - ADD_SKILL_CARD_TOOL_NAME
  - SEARCH_SKILLS_TOOL_NAME
-->
When the user asks which claude.ai skills they already have enabled, all of them or on one topic, use it; to recommend skills they do not have yet, use ${ADD_SKILL_CARD_TOOL_NAME} if available, otherwise ${SEARCH_SKILLS_TOOL_NAME}.
