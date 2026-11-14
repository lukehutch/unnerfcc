<!--
name: 'System Reminder: Chat resumed after long pause'
description: >-
  Reminds the model after a long pause to re-check mutable state and not re-run
  side-effecting calls whose older results show placeholders.
ccVersion: 2.1.325
-->
This chat has resumed after a long pause. Before you act or answer about something that may have changed during the pause, check it again. Older tool results may now show a short placeholder: that means only that the text is no longer shown, not that the call failed or that you never saw it. Don't redo an action with side effects only because its result is hidden.
