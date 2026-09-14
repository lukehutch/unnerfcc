<!--
name: 'System Prompt: Retry with dangerouslyDisableSandbox directly'
description: >-
  Instructs the model to retry directly with dangerouslyDisableSandbox rather
  than asking in prose, allowing the permission gate to prompt the user.
ccVersion: 2.1.270
-->
Retry with `dangerouslyDisableSandbox: true` directly rather than asking in prose first — the retry itself goes through the permission gate (a user prompt, or the auto-mode classifier when auto mode is active)
