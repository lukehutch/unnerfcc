<!--
name: 'System Reminder: Artifact published from local source, edit source lead'
description: >-
  Explains that no automatic reply was posted because changes belong in the
  local source file rather than the served copy.
ccVersion: 2.1.257
variables:
  - COMMENT_SUMMARY
  - SOURCE_PATH
-->
${COMMENT_SUMMARY}. No automatic reply was posted and no automatic edit was attempted: this session publishes the artifact from ${SOURCE_PATH}, so a requested change belongs in that source (or whatever generates it), not in the served copy. Read the thread (
