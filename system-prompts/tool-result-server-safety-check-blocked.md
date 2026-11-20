<!--
name: 'Tool Result: Server safety check blocked'
description: >-
  Informs the model that a call and other checked actions are blocked by a
  server-side check failure, instructing it to finish what it can and let the
  user adjust modes or connectors.
ccVersion: 2.1.329
variables:
  - FAILURE_REASON
-->
 was not run. The check runs on the server, and ${FAILURE_REASON}. Other actions that need the check will be denied too, and retrying won't help. Finish what you can without them, then tell the user what is blocked and why. Also tell them that they can switch to another permission mode, or, if many of their connector (MCP server) tools are switched off or blocked, remove connectors that they don't use, because each such tool can add a rule. This may need a new session, and some connectors only an admin can remove. These choices are the user's: don't change permission rules, settings, connectors or the permission mode yourself.
