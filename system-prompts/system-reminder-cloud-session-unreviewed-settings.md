<!--
name: 'System Reminder: Unreviewed local settings in cloud session'
description: >-
  Informs the model that the user's local settings contain unreviewed
  configurations for cloud sessions and advises running claude
  apply-project-settings.
ccVersion: 2.1.310
-->
The person's own Claude Code settings on this computer hold something they have not accepted for cloud sessions, so allow rules in them may not count here and a command may be asked about. Tell the user: to review, run claude apply-project-settings in a terminal on this computer.
