<!--
name: 'Skill: Code Review fallback sentence before tool call'
description: >-
  Model-facing instruction to write the specified verbatim sentence before
  calling the findings tool.
ccVersion: 2.1.329
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
Then write this sentence, word for word, before the ${REPORT_FINDINGS_TOOL_NAME} call
