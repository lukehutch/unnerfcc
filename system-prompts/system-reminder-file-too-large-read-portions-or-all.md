<!--
name: 'System Reminder: Large file read in portions or whole'
description: >-
  Instructs reading large unattached files using offset/limit or calling the
  read tool with read-all parameter.
ccVersion: 2.1.310
variables:
  - READ_TOOL_NAME
  - READ_ALL_PARAM
-->
). Its contents were not attached because the file is too large to read all at once. Read it in portions with the offset and limit parameters, starting with a few hundred lines, or search for specific content instead of reading the whole file. Only if you genuinely need all of it, call ${READ_TOOL_NAME} with ${READ_ALL_PARAM}: true, which reads it whole when it still fits in your context.
