<!--
name: 'Tool Result: Remote machine permission reason'
description: >-
  Identifies the action as occurring on another machine and quotes the
  unverified reason given by that machine's Claude Code for asking.
ccVersion: 2.1.329
variables:
  - FOLDER_CLAUSE
  - REASON_TEXT
-->
 (another machine, not this one)${FOLDER_CLAUSE} that machine's Claude Code gave this reason for asking (its words, unverified): "${REASON_TEXT}"
