<!--
name: 'Skill: Code Review fallback two sentences before tool call'
description: >-
  Model-facing instruction to write two verbatim sentences before calling the
  findings tool.
ccVersion: 2.1.329
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
Then write these two sentences, word for word, before the ${REPORT_FINDINGS_TOOL_NAME} call
