<!--
name: 'Tool Description: Self-hosted runner environment state'
description: >-
  Describes the typed doctor tool that reads a self-hosted environment's
  aggregate capacity and queue counters, and surfaces the equivalent Admin-UI
  path.
ccVersion: 2.1.231
-->
Read a self-hosted environment's aggregate state (alive_runner_count, available_capacity_total, capacity_in_use, pending_session_count, unplaceable_session_count, backing_off_count, circuit_broken_count).
The result includes an `equivalent.ui` string with the Admin-UI path. Surface it to the operator so they can repeat the action without you.
Auth: handled internally via the operator's `claude login` OAuth session — secrets never enter the conversation.
