<!--
name: 'Data: Context Tip Situation — MCP Discovery'
description: >-
  Situation text detecting manual bridging of external system data into the
  conversation, used by the tip selector to suggest MCP connectors.
ccVersion: 2.1.191
-->
User pastes data from external systems into the conversation — database output, API responses, Slack messages, error logs from monitoring tools, issue tracker content. They are manually bridging Claude and an external service. Also matches when Claude says it cannot access something ("I don't have access to your database/Slack/Jira") and the user has to provide the data manually. IMPORTANT: Do NOT match this when the user pastes code for review or refactoring — that is normal Claude Code usage.
