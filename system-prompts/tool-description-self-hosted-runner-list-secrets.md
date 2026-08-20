<!--
name: 'Tool Description: Self-hosted runner list environment secrets'
description: >-
  Describes the typed doctor tool that lists environment-secret metadata (never
  values), surfaces the equivalent Admin-UI path, and authenticates from the
  operator's own login session.
ccVersion: 2.1.231
-->
List environment secrets (jti, label, created_at, revoked, last_used_at). Secret values are never returned — only metadata.
The result includes an `equivalent.ui` string with the Admin-UI path. Surface it to the operator so they can repeat the action without you.
Auth: handled internally via the operator's `claude login` OAuth session — secrets never enter the conversation.
