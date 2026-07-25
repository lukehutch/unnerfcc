<!--
name: 'Tool Result: TaskCreate creates one task per call'
description: >-
  Rejects a batched TaskCreate call, restating that there is no `tasks`/`todos`
  parameter and that `subject` and `description` are top-level strings.
ccVersion: 2.1.219
-->
TaskCreate creates ONE task per call and has no `tasks` or `todos` parameter. Call TaskCreate once per task, passing `subject` (a brief title) and `description` (what needs to be done) as top-level string parameters.
