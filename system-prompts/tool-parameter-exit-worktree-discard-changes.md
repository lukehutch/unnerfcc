<!--
name: ExitWorktree discard_changes
description: >-
  Description of the 'discard_changes' input parameter in the ExitWorktree
  tool's inputSchema; model-facing as part of the tool definition serialized to
  the model.
ccVersion: 2.1.329
-->
Required true when action is "remove" and the worktree has uncommitted files or unmerged commits. The tool will refuse and list them otherwise. It also removes the worktree under any task still running there, so set it only after the user has confirmed.
