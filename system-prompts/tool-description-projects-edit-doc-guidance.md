<!--
name: 'Tool Description: Projects edit doc guidance'
description: >-
  Instructs reading a project doc with project_read if not already in context
  and applying targeted edits via project_write.
ccVersion: 2.1.329
-->
- **To edit a project doc**, `project_read` it unless its current text is already in this conversation, then `project_write` to the same path with `edits` that hold only what changes. Send the full `content` only to rewrite most of the doc.
