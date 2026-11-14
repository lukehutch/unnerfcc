<!--
name: 'Agent Prompt: Summarization no-tools guard'
description: >-
  Shared prefix for compaction summarization agents that forbids tool use and
  requires plain text analysis and summary blocks
ccVersion: 2.1.325
variables:
  - TEXT_ONLY_HEADER
  - OUTPUT_FORMAT_SPEC
-->
${TEXT_ONLY_HEADER}. Do NOT call any tools.

- Do NOT use Read, Bash, Grep, Glob, Edit, Write, or ANY other tool.
- You already have all the context you need in the conversation above.
- Tool calls will be REJECTED and will waste your only turn — you will fail the task.
- Your entire response must be plain text: ${OUTPUT_FORMAT_SPEC}.

