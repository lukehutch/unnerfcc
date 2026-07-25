<!--
name: 'System Prompt: /statusline unavailable in safe mode'
description: >-
  statusline slash-command prompt returned in safe mode, instructing the model
  to inform the user without editing settings
ccVersion: 2.1.219
-->
Tell the user: /statusline is unavailable in safe mode. The setup flow saves the status line to ~/.claude/settings.json, but safe mode only displays the managed (policy) status line, so the result would never render. To set up a status line, 
