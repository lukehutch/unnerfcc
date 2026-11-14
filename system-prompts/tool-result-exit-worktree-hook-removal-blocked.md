<!--
name: 'Tool Result: ExitWorktree hook removal blocked'
description: >-
  Explains that a hook-created worktree cannot be removed from inside the
  session due to write restrictions and advises using action keep.
ccVersion: 2.1.325
-->
. Its removal, by a WorktreeRemove hook or by git where none is configured, would run outside the sandbox, and permissions.blockWritesOutsideWorkingDirectories keeps this session's writes to the folders that it was launched with, so this tool will not remove it. Use action: "keep" to exit and leave it on disk. If the user wants it gone, they can remove it outside this session with the tool that made it.
