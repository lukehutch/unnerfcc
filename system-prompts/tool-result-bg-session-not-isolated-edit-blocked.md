<!--
name: 'Tool Result: Background session not isolated (edit blocked)'
description: >-
  Blocks an edit made by an un-isolated background session and tells the model
  to enter a worktree first, then retry using the worktree path.
ccVersion: 2.1.219
variables:
  - ENTER_WORKTREE_TOOL_NAME
-->
This background session hasn't isolated its changes yet. Call ${ENTER_WORKTREE_TOOL_NAME} first so edits land in a worktree instead of the shared checkout, then retry this edit using the worktree path. (To disable this guard for this repo, set `"worktree": {"bgIsolation": "none"}` in .claude/settings.json.)
