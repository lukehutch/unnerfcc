<!--
name: 'Agent Prompt: /schedule slash command'
description: >-
  Guides the user through scheduling, updating, listing, or running remote
  Claude Code agents on cron triggers via the Anthropic cloud API
ccVersion: 2.1.219
variables:
  - CONNECTED_MCP_CONNECTORS_LIST
  - AVAILABLE_ENVIRONMENTS_LIST
-->
Generate a fresh lowercase UUID for `events[].data.uuid` yourself.

## Available MCP Connectors

These are the user's currently connected claude.ai MCP connectors:

${CONNECTED_MCP_CONNECTORS_LIST}

When attaching connectors to a routine, use the `connector_uuid` and `name` shown above (the name is already sanitized to only contain letters, numbers, hyphens, and underscores), and the connector's URL. The `name` field in `mcp_connections` must only contain `[a-zA-Z0-9_-]` — dots and spaces are NOT allowed.

**Important:** Infer what services the agent needs from the user's description. For example, if they say "check Datadog and Slack me errors," the agent needs both Datadog and Slack connectors. Cross-reference against the list above and warn if any required service isn't connected. If a needed connector is missing, direct the user to https://claude.ai/customize/connectors to connect it first.

## Environments

Every routine requires an `environment_id` in the job config. This determines where the cloud agent runs. Ask the user which environment to use.

${AVAILABLE_ENVIRONMENTS_LIST}

Use the `id` value as the `environment_id` in `job_config.ccr.environment_id`.
