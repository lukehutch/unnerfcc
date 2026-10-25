<!--
name: 'Tool Result: Disk quota exceeded (EDQUOT)'
description: >-
  Reports that a test write failed with EDQUOT because the user's disk quota is
  exceeded on the temporary directory volume.
ccVersion: 2.1.310
variables:
  - TMPDIR_PATH
  - COMMAND_NAME
-->
Disk quota used up: a test write beside this command's output file, on the volume holding ${TMPDIR_PATH} (Claude Code's temporary directory), failed with EDQUOT, so ${COMMAND_NAME} and its own writes may have failed with "Disk quota exceeded". Delete files there that are no longer needed, or restart Claude Code with CLAUDE_CODE_TMPDIR set to a directory on another volume, then retry. If this is the user's own computer, tell them before deleting anything to make room.
