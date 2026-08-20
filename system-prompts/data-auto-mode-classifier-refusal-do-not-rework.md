<!--
name: 'Data: Auto-mode classifier refusal — do not rework the action'
description: >-
  Tail of the auto-mode denial telling the model the refusal reacts to earlier
  conversation content and will keep firing, so it should not rework the action,
  and what to tell the user if the action is essential.
ccVersion: 2.1.231
-->
Retrying it will hit the same refusal, so don't rewrite or rework the action to get around this — it reacts to earlier conversation content, not to the action itself, and it will keep firing for the rest of this conversation. Continue with other tasks that don't require this action. If it is essential, stop and tell the user that auto mode could not evaluate it, and suggest running this action outside auto mode (switch back to the default permission mode) or starting a fresh session.
