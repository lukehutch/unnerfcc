<!--
name: 'System Reminder: Workspace diff projects folder excluded'
description: >-
  Explains that the projects folder is omitted from the non-git workspace diff
  listing in case it is a copy of a Claude Code config folder.
ccVersion: 2.1.329
variables:
  - SKIP_REASON
-->
workspace diff (launch folder not in a git repository): ${SKIP_REASON}, so the folder that holds projects is left out of the listing in case it is a copy of a Claude Code config folder
