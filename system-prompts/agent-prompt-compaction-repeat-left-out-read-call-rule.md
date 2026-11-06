<!--
name: 'Agent Prompt: Compaction rule on repeating left-out read calls'
description: >-
  Directs the model to only repeat omitted tool calls that were read-only and
  never repeat state-changing calls.
ccVersion: 2.1.318
-->
Repeat a left-out call that was made only if it just reads, for only the part you need, a few at a time. Do not repeat a call that changed something.
