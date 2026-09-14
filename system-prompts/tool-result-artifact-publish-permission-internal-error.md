<!--
name: 'Tool Result: Artifact Publish Permission Internal Error'
description: >-
  Reports an internal error during publish permission checking and instructs
  telling the user without retrying.
ccVersion: 2.1.270
-->
file_path: the permission check for this publish hit an internal error before it recorded the file, so nothing was published. Retrying is unlikely to help: do not retry; tell the user Claude Code could not check this publish.
