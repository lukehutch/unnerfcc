<!--
name: 'System Reminder: Stale thread checklist update instruction'
description: >-
  Model-facing suffix instructing the model to post the current formatted
  checklist using the thread update tool so the user sees progress.
ccVersion: 2.1.329
variables:
  - CHECKLIST_TOOL_NAME
  - REPLY_TOOL_NAME
-->
 minutes. The user can only see what `${CHECKLIST_TOOL_NAME}` and `${REPLY_TOOL_NAME}` post, and a thread that shows no change reads as stuck. Call `${CHECKLIST_TOOL_NAME}` now with the checklist as it stands (✓ done, ✱ in progress, ○ not started), then continue the work.
