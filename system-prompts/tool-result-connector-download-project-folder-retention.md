<!--
name: 'Tool Result: Connector download project folder retention note'
description: >-
  Model-facing suffix noting that files in the folder are deleted after the
  user's cleanup period.
ccVersion: 2.1.329
variables:
  - CLEANUP_DAYS
-->
. Claude Code deletes files in that folder after the person's cleanup period (${CLEANUP_DAYS} days by default).
