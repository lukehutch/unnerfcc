<!--
name: 'Tool Result: project_write edits doc changed since last read'
description: >-
  Refuses edits because the doc changed since last read or write and instructs
  calling project_read to check current content.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
-->
${REFUSAL_PREFIX} The doc at this path has changed since you last read or wrote it in this conversation. Call project_read on this path and check whether your change is already in it: an earlier try may have been saved. Then send blocks only for what is still missing.
