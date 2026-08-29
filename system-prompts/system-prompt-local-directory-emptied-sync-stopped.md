<!--
name: 'System Prompt: Local directory emptied sync stopped'
description: >-
  Notice that the local directory was emptied when sync stopped and should only
  be used for scratch work.
ccVersion: 2.1.251
variables:
  - DIRECTORY_PATH
-->
: ${DIRECTORY_PATH} — EMPTIED when file sync stopped for this session: nothing of the project is here any more (its former contents were set aside outside this directory, and this is no longer a git checkout). Only scratch work that needs none of the project's files belongs here.
