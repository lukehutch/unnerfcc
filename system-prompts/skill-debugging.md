<!--
name: 'Skill: Debugging'
description: >-
  Instructions for debugging an issue that the user is encountering in the
  Claude Code session
ccVersion: 2.1.219
variables:
  - LOG_LINE_COUNT
  - CLAUDE_CODE_GUIDE_SUBAGENT_NAME
-->


## Instructions

1. Review the user's issue description
2. The last ${LOG_LINE_COUNT} lines show the debug file format. Look for [ERROR] and [WARN] entries, stack traces, and failure patterns across the file
3. Consider launching the ${CLAUDE_CODE_GUIDE_SUBAGENT_NAME} subagent to understand the relevant Claude Code features
4. Explain what you found in plain language
5. Suggest concrete fixes or next steps
