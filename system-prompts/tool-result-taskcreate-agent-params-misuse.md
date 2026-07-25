<!--
name: 'Tool Result: TaskCreate called with Agent parameters'
description: >-
  Rejects a TaskCreate call that passed `prompt`/`subagent_type`, restating
  TaskCreate's real parameters and pointing delegation at the Agent tool.
ccVersion: 2.1.219
-->
This call used Agent-tool parameters (`prompt`/`subagent_type`). TaskCreate adds an item to the task list and takes `subject` and `description` string parameters. To delegate work to a subagent, use the Agent tool instead.
