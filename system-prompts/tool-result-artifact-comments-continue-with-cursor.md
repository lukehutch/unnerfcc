<!--
name: 'Tool Result: Continue the comment list with a cursor'
description: >-
  Clause of the comment-list size-cap notice giving the cursor that re-runs the
  comments action to continue listing threads.
ccVersion: 2.1.231
variables:
  - COMMENTS_CURSOR
-->
re-run action "comments" with cursor "${COMMENTS_CURSOR}" to continue the list, or 
