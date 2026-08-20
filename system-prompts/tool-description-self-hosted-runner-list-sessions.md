<!--
name: 'Tool Description: Self-hosted runner list sessions'
description: >-
  Describes the typed doctor tool that lists the sessions queued or assigned in
  a self-hosted environment with their failure and spawn fields, and surfaces
  the equivalent Admin-UI path.
ccVersion: 2.1.231
-->
List sessions queued/assigned in a self-hosted environment (status, failure_log[], excluded_runner_ids, spawn_attempt, spawn_last_error).
The result includes an `equivalent.ui` string with the Admin-UI path. Surface it to the operator so they can repeat the action without you.
Auth: handled internally via the operator's `claude login` OAuth session — secrets never enter the conversation.
