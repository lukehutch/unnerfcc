<!--
name: 'Tool Parameter: Task description field'
description: >-
  Describes the saved task description field in TaskStatus results, noting
  PreToolUse hook modifications.
ccVersion: 2.1.318
-->
The task's description as saved. It can differ from the tool_use input if Claude Code corrects a malformed call or a PreToolUse hook changes the input. Absent in results from older Claude Code versions.
