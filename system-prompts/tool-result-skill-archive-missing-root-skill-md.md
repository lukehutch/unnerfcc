<!--
name: 'Tool Result: Skill archive missing root SKILL.md'
description: >-
  Error returned when an MCP skill archive has no SKILL.md at its root (found
  inside a wrapper directory); surfaced to the model as the failed
  prompt-command's text content
ccVersion: 2.1.181
variables:
  - TOOL_RESULT_SKILL_ARCHIVE_MISSING_ROOT_SKILL_MD_VAR_0
-->
Archive ${TOOL_RESULT_SKILL_ARCHIVE_MISSING_ROOT_SKILL_MD_VAR_0.url} has no root SKILL.md — found one inside a wrapper directory. Archive contents must be rooted at SKILL.md, not my-skill/SKILL.md.
