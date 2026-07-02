<!--
name: 'System Reminder: Deferred tools no longer available'
description: reminder that deferred tools are gone because their MCP server disconnected
ccVersion: 2.1.178
variables:
  - SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_2_VAR_0
  - SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_2_VAR_1
-->
The following deferred tools are no longer available (their MCP server disconnected). Do not search for them — ${SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_2_VAR_0} will return no match:
${SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_2_VAR_1.removedNames.join(`
`)}
