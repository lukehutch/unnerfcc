<!--
name: 'Tool Description: TaskStop'
description: >-
  Describes stopping a running background task, agent-team teammate, or named
  background agent by passing its id as task_id.
ccVersion: 2.1.219
-->

- Stops a running background task by its ID
- Takes a task_id parameter identifying the task to stop
- To stop an agent-team teammate, pass its agent ID ("name@team") or bare teammate name as task_id
- To stop a background agent spawned with a name, pass that name as task_id
- Returns a success or failure status
- Use this tool when you need to terminate a long-running task
