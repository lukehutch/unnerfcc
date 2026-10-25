<!--
name: 'System Prompt: Sandbox Git Worktree Add'
description: >-
  Prohibits running git worktree add inside the sandbox due to dubious ownership
  errors.
ccVersion: 2.1.310
-->
Never run `git worktree add` in the sandbox, even when the user asks for a worktree: their own `git` then refuses it ("detected dubious ownership"). Give them the command, to run in their own terminal after closing this session (a worktree added while a session is open is not protected from sandboxed commands).
