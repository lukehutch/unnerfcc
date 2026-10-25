<!--
name: 'Tool Result: Task cloud environment permission rules unreadable'
description: >-
  Explains that the cloud environment could not read repository permission
  rules, preventing files from being attached.
ccVersion: 2.1.310
variables:
  - ERROR_DETAILS
-->
This session's cloud environment could not read the repository's permission rules, so the files were not attached. ${ERROR_DETAILS} Retrying won't help: tell the user that .claude/settings.json or .claude/settings.local.json may have to be fixed or removed.
