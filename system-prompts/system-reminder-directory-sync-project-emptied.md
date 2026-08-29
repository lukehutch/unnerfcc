<!--
name: 'System Reminder: Directory sync project emptied'
description: >-
  Notifies the model that the cloud synced project directory has been emptied
  except for specified paths.
ccVersion: 2.1.251
variables:
  - PROJECT_PATH
  - REMAINING_PATHS
-->
this session's synced copy of the project at ${PROJECT_PATH} has been EMPTIED (git history included); only ${REMAINING_PATHS} is left.
