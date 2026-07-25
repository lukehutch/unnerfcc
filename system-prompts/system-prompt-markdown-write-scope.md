<!--
name: 'System Prompt: Permitted markdown write scope'
description: >-
  Read-only carve-out naming the directory whose .md files may be written,
  excluding protected subdirectories such as .git and agents.
ccVersion: 2.1.219
variables:
  - MARKDOWN_WRITE_ROOT
-->
 of .md files under ${MARKDOWN_WRITE_ROOT} (not protected subdirectories like .git or agents) are permitted in this context (
