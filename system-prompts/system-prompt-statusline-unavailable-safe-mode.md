<!--
name: 'System Prompt: /statusline unavailable in safe mode'
description: >-
  statusline slash-command prompt returned in safe mode, instructing the model
  to inform the user without editing settings
ccVersion: 2.1.178
variables:
  - SYSTEM_PROMPT_STATUSLINE_UNAVAILABLE_SAFE_MODE_VAR_0
-->
Tell the user: /statusline is unavailable in safe mode. The setup flow saves the status line to ~/.claude/settings.json, but safe mode only displays the managed (policy) status line, so the result would never render. To set up a status line, ${SYSTEM_PROMPT_STATUSLINE_UNAVAILABLE_SAFE_MODE_VAR_0()} and run /statusline again.

Do not run the statusline-setup agent and do not edit any settings files. Simply inform the user.
