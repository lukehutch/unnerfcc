<!--
name: 'Tool Result: Artifact sign-in refused in hosted sandbox'
description: >-
  Informs the model that Artifacts refused a user's own login inside an
  Anthropic-hosted sandbox and instructs explaining the remediation options
  without retrying.
ccVersion: 2.1.325
-->
Artifacts refused this sign-in because Claude Code is using a person's own login or token inside an Anthropic-hosted sandbox with restricted network access. That doesn't show whether any artifact exists or who can open it. The user can remove the login or token they added and let the cloud session make the call under its own sign-in, or run Claude Code outside the sandbox. Tell the user, and don't retry or try another way from this session
