<!--
name: 'System Reminder: Background agent resumed after Stop'
description: >-
  Notifies a resumed background agent that the user previously pressed Stop,
  instructing it to check partial tool calls and note that child background
  tasks may have ended.
ccVersion: 2.1.329
-->
The user pressed Stop, which ended every background agent, you among them. You have now been resumed, so a line above that tells you to stop and wait no longer holds. A tool call that was running then may have run in part or in full, so check before you repeat it. Background commands and agents that you started may have ended, and their reports may be lost.
