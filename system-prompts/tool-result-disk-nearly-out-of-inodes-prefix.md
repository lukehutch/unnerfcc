<!--
name: 'Tool Result: Disk nearly out of inodes prefix'
description: >-
  Warns that the volume holding Claude Code's temporary directory is nearly out
  of inodes.
ccVersion: 2.1.310
variables:
  - TMPDIR_PATH
-->
Nearly out of inodes: this computer's volume holding ${TMPDIR_PATH} (Claude Code's temporary directory) has 
