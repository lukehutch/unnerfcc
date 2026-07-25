<!--
name: 'Agent Prompt: /schedule cron timezone and update fields'
description: >-
  Section of the /schedule prompt listing the remaining update fields and
  introducing cron examples in the user's local timezone.
ccVersion: 2.1.219
variables:
  - USER_TIMEZONE
-->
, `enabled`, `job_config`
- `mcp_connections` — Replace MCP connections
- `clear_mcp_connections` (boolean) — Remove all MCP connections

### Cron Expression Examples

The user's local timezone is **${USER_TIMEZONE}**. Cron expressions
