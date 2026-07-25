<!--
name: 'Agent Prompt: Schedule model and connector validation'
description: >-
  Tells /schedule which model to default to and to cross-check the connectors a
  routine needs against the user's connected list.
ccVersion: 2.1.219
-->

4. **Choose the model** — Default to `claude-sonnet-5`. Tell the user which model you're defaulting to and ask if they want a different one.
5. **Validate connections** — Infer what services the agent will need from the user's description. For example, if they say "check Datadog and Slack me errors," the agent needs both Datadog and Slack MCP connectors. Cross-reference with the connectors list above. If any are missing, warn the user and link them to https://claude.ai/customize/connectors to connect first.
