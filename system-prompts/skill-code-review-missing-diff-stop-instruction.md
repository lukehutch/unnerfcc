<!--
name: 'Skill: Code Review stop when diff command fails'
description: >-
  Model-facing instruction to stop, make no tool calls, and reply with a single
  sentence when the target diff could not be obtained.
ccVersion: 2.1.329
variables:
  - REPORT_FINDINGS_TOOL_NAME
  - FAILURE_REASON
-->
If that leaves you without the diff, because a command was refused or failed, stop: post nothing, change no file, make no ${REPORT_FINDINGS_TOOL_NAME} call, and reply with only this sentence, word for word, and no list of findings, not even an empty one: "${FAILURE_REASON}, so nothing was reviewed."
