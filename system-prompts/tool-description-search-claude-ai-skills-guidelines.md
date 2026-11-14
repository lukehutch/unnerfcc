<!--
name: 'Tool Description: Search claude.ai skills for team guidelines'
description: >-
  Model-facing guidance on searching claude.ai skills when a task references
  user or team templates, formats, or guidelines.
ccVersion: 2.1.325
variables:
  - LIST_SKILLS_TOOL_NAME
-->
When the task points at the user's or their team's own guidelines, templates or formats, use it to search their claude.ai skills for them; when the user asks which skills they have, use ${LIST_SKILLS_TOOL_NAME}.
