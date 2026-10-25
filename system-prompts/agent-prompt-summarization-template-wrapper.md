<!--
name: 'Agent Prompt: Summarization template wrapper'
description: >-
  Outer wrapper combining summary task instructions, structure, and contextual
  summarization guidelines.
ccVersion: 2.1.310
variables:
  - TASK_INTRO
  - SUMMARY_BODY
  - SUMMARY_EXAMPLE
-->
${TASK_INTRO}

${SUMMARY_BODY}${SUMMARY_EXAMPLE}

There may be additional summarization instructions provided in the included context. If so, remember to follow these instructions when creating the summary.
