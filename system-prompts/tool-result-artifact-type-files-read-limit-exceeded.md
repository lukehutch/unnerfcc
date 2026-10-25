<!--
name: 'Tool Result: Artifact type files read limit exceeded'
description: >-
  Explains that file listing for an artifact type was truncated and advises
  making another call for specific files.
ccVersion: 2.1.310
variables:
  - UNREAD_FILES
  - UNREAD_SUFFIX
  - MAX_FILES
  - MAX_CHARS
  - TARGET_FILE
-->
Not read: ${UNREAD_FILES}${UNREAD_SUFFIX}. One read of a type's files shows at most ${MAX_FILES} files and about ${MAX_CHARS} characters; to read ${TARGET_FILE}, pass ${TARGET_FILE} in another call.
