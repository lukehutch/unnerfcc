<!--
name: 'System Reminder: Unattached working-directory files guidance'
description: >-
  Informs the model that file contents are not attached automatically and
  directs reading working-directory files with file tools before responding.
ccVersion: 2.1.325
variables:
  - FILE_REFERENCE
-->
${FILE_REFERENCE}. File contents are not attached automatically in this session: if these are files or directories in your working directory, read them with your file tools before responding.
