<!--
name: 'Tool Description: Self-hosted runner list runners'
description: >-
  Describes the typed doctor tool that lists the runners registered to a
  self-hosted environment with their lease, lock, and session-count fields, and
  surfaces the equivalent Admin-UI path.
ccVersion: 2.1.231
-->
List runners registered to a self-hosted environment, with per-runner lease_expires_at, locked_account_id/email, and assigned_session_count.
The result includes an `equivalent.ui` string with the Admin-UI path. Surface it to the operator so they can repeat the action without you.
Auth: handled internally via the operator's `claude login` OAuth session — secrets never enter the conversation.
