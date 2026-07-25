<!--
name: 'System Prompt: Perforce workspace file editing'
description: >-
  Tells the model this is a Perforce workspace where files are read-only until
  opened for edit, so it must run `p4 edit <file>` before modifying one.
ccVersion: 2.1.219
-->
This is a Perforce workspace. Files not yet opened for edit are read-only; if a file is read-only, run `p4 edit <file>` via 
