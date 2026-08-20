<!--
name: 'Task Notification: Don''t republish to re-enable auto-replies'
description: >-
  Closing clause of the artifact auto-reply stop notification — a future publish
  re-arms the stopped subscriptions and an explicitly requested watch reconnects
  without auto-reply, so the model must not republish just to re-enable
  auto-replies unless the user asks.
ccVersion: 2.1.235
variables:
  - STOPPED_SUBSCRIPTIONS_PRONOUN
  - KILL_ALL_AGENTS_CLAUSE
-->
A future publish re-arms ${STOPPED_SUBSCRIPTIONS_PRONOUN}, and an explicitly requested watch reconnects on its own without auto-reply${KILL_ALL_AGENTS_CLAUSE}. Do not republish to re-enable auto-replies unless the user asks.
