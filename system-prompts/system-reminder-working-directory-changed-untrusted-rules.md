<!--
name: 'System Reminder: Working directory changed untrusted rules note'
description: >-
  Model-facing warning that project permission rules in the new directory are
  not applied unless both directories are explicitly trusted.
ccVersion: 2.1.325
variables:
  - NEW_WORKING_DIRECTORY
  - LAUNCH_DIRECTORY
-->
Note: ${NEW_WORKING_DIRECTORY} declares project permission rules and/or additional directories in its settings, but they are NOT applied — while the session is outside ${NEW_WORKING_DIRECTORY}, they count only if both it and ${LAUNCH_DIRECTORY} have been trusted explicitly. Tool calls those rules would have pre-approved will ask for permission.
