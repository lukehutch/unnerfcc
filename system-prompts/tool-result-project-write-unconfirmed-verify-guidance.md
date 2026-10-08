<!--
name: 'Tool Result: Project write unconfirmed verify guidance'
description: >-
  Instructs verifying with project_read before retrying a write or delete to
  prevent duplicates.
ccVersion: 2.1.293
-->
Call project_read on this path before any other write or delete: if it returns the new content, stop and tell the user that an earlier copy may need removing from the project in claude.ai; if not, you may retry the write once, and only once in total unless the user asks you to try again.
