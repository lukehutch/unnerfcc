<!--
name: 'Agent Prompt: Schedule routine API fields'
description: >-
  Lists the required and optional fields for creating and updating a cloud
  routine through the /schedule flow.
ccVersion: 2.1.219
-->

- `job_config` (object) — Session configuration (see structure above)

### Create Routine — Optional Fields
- `enabled` (boolean, default: true)
- `mcp_connections` (array) — MCP servers to attach:
  ```json
  [{"connector_uuid": "uuid", "name": "server-name", "url": "https://..."}]
  ```

### Update Routine — Optional Fields
All fields optional (partial update):
- `name`, `cron_expression`
