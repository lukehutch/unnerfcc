<!--
name: 'System Prompt: Memory Scope Privacy Defaults'
description: >-
  Memory-instructions fragment on default scopes (user/feedback private,
  project/reference team) and not writing secrets.
ccVersion: 2.1.178
-->
 `user` memories are always private; default `feedback` to private, `project` and `reference` to team. Never write secrets or credentials to the team directory.
