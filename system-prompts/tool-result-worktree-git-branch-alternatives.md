<!--
name: 'Tool Result: Worktree git branch manipulation alternatives'
description: >-
  Advises using git commit, reset, rebase, or branch creation in the worktree
  while leaving the user's own branches untouched.
ccVersion: 2.1.329
-->
To change this worktree's own branch use git commit, git reset or git rebase; to make another, or to keep a commit, git branch <new-branch> <commit>. Finished work can stay on this worktree's branch. Leave the user's branches as they are, even to undo a mistake.
