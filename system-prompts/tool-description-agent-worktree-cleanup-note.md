<!--
name: 'Tool Description: Agent worktree cleanup'
description: >-
  Notes that a worktree-isolated agent's worktree is auto-cleaned when it makes
  no changes, and otherwise its path and branch are returned in the result.
ccVersion: 2.1.219
-->

- With `isolation: "worktree"`, the worktree is automatically cleaned up if the agent makes no changes; otherwise the path and branch are returned in the result.
