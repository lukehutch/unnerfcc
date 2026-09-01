<!--
name: 'Task Notification: No tool available to read or reply to artifact comments'
description: >-
  Informs the model that no tool in this session can read or reply to artifact
  comments and to notify the user.
ccVersion: 2.1.257
variables:
  - PENDING_COMMENTS_NOTICE
-->
${PENDING_COMMENTS_NOTICE}. Nothing was posted: this session has no tool that can read or reply to artifact comments, so tell the user about the comment and let them answer it on the page (further comments will not repeat this notice).
