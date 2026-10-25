<!--
name: 'Tool Result: Cloud session cannot modify settings file'
description: >-
  Rejects edits to Claude Code settings files in cloud sessions because approval
  must happen on the local computer.
ccVersion: 2.1.310
variables:
  - SETTINGS_FILE_PATH
-->
Not applied: ${SETTINGS_FILE_PATH} was NOT modified. A change to a Claude Code settings file applies only when a person approves it at the computer that Claude Code runs on, and a cloud session cannot take that approval. Approving the edit in this session does not apply it. The /settings-review command does not run in a cloud session, and on another computer it would not list this change. Tell the user what you meant to change. If the file is committed to a repository, the user can make the change themselves outside this session and push it. Do not retry the edit or try to make the same change another way.
