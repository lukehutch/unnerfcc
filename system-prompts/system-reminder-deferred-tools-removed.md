<!--
name: 'System Reminder: Deferred tools no longer available'
description: >-
  Reminder that deferred MCP tools are gone after a server disconnect; do not
  search for them.
ccVersion: 2.1.178
variables:
  - SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_VAR_0
  - SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_VAR_1
  - SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_VAR_2
-->
${SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_VAR_0.removedNames.length} deferred tools are no longer available (MCP server disconnected): ${SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_VAR_1(SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_VAR_0.removedNames)}. Do not search for them — ${SYSTEM_REMINDER_DEFERRED_TOOLS_REMOVED_VAR_2} will return no match.
