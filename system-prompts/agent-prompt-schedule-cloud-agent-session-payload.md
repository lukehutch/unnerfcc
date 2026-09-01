<!--
name: 'Agent Prompt: Schedule cloud agent session payload'
description: >-
  Shows the JSON job_config/events payload shape (allowed tools and seed user
  event) used when creating a cloud routine.
ccVersion: 2.1.257
variables:
  - MCP_CONNECTORS_LIST
  - ENVIRONMENTS_LIST
-->
"}}
        ],
        "allowed_tools": ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
      },
      "events": [
        {"data": {
          "uuid": "<lowercase v4 uuid>",
          "session_id": "",
          "type": "user",
          "parent_tool_use_id": null,
          "message": {"content": "PROMPT_HERE", "role": "user"}
        }}
      ]
    }
  }
}
```

For a one-time run, replace `"cron_expression": "CRON_EXPR"` with `"run_once_at": "YYYY-MM-DDTHH:MM:SSZ"` (RFC3339 UTC, must be in the future). Everything else is identical.

Generate a fresh lowercase UUID for `events[].data.uuid` yourself.

Every `events[].data.message` must be the API message shape `{"role": "user", "content": "..."}` — the `role` field is required, never omit it.

## Available MCP Connectors

These are the user's currently connected claude.ai MCP connectors:

${MCP_CONNECTORS_LIST}

When attaching connectors to a routine, use the `connector_uuid` and `name` shown above (the name is already sanitized to only contain letters, numbers, hyphens, and underscores), and the connector's URL. The `name` field in `mcp_connections` must only contain `[a-zA-Z0-9_-]` — dots and spaces are NOT allowed.

**Important:** Infer what services the agent needs from the user's description. For example, if they say "check Datadog and Slack me errors," the agent needs both Datadog and Slack connectors. Cross-reference against the list above and warn if any required service isn't connected. If a needed connector is missing, direct the user to https://claude.ai/customize/connectors to connect it first.

## Environments

Every routine requires an `environment_id` in the job config. This determines where the cloud agent runs. Ask the user which environment to use.

${ENVIRONMENTS_LIST}

Use the `id` value as the `environment_id` in `job_config.ccr.environment_id`.
