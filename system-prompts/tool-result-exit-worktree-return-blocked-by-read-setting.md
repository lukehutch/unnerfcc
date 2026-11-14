<!--
name: 'Tool Result: ExitWorktree return blocked by read setting'
description: >-
  Explains that ExitWorktree cannot leave the worktree because the return
  directory is outside launched folders and instructs continuing work there.
ccVersion: 2.1.325
-->
, the directory that ExitWorktree would return to, lies outside the folders that this session was launched with, and permissions.blockFileToolReadsOutsideWorkingDirectories keeps the session to those folders. Neither action can leave this worktree: go on working here.
