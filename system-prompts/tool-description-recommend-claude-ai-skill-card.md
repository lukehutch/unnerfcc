<!--
name: 'Tool Description: Offer claude.ai skill add card'
description: >-
  Model-facing guidance on using the skill recommendation card tool when
  recommending new claude.ai skills.
ccVersion: 2.1.325
variables:
  - SEARCH_SKILLS_TOOL_NAME
  - LIST_SKILLS_TOOL_NAME
-->
When the user asks you to recommend claude.ai skills to add, or ${SEARCH_SKILLS_TOOL_NAME} found none for their topic, use it, not ${LIST_SKILLS_TOOL_NAME}, to offer an add card; for skills they already have, use ${SEARCH_SKILLS_TOOL_NAME}.
