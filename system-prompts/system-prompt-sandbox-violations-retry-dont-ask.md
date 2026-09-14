<!--
name: 'System Prompt: Sandbox violations retry without asking'
description: >-
  Instructs retrying with allowed_domains in auto mode or
  dangerouslyDisableSandbox directly without asking.
ccVersion: 2.1.270
-->
If the `<sandbox_violations>` block names a denied host, re-run the command with that host in its `allowed_domains` (auto mode); otherwise retry with `dangerouslyDisableSandbox: true` (don't ask, just do it)
