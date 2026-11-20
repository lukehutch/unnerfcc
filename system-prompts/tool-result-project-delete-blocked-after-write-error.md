<!--
name: 'Tool Result: Project doc delete blocked after write error'
description: >-
  Refuses deleting a project doc in the same response after an earlier
  project_write failed, to prevent losing unsaved text.
ccVersion: 2.1.329
-->
This call deleted nothing. A project_write earlier in this response was refused or returned an error, and this call was sent before that result was known, so this doc may hold text that is saved nowhere else. This refusal applies to this response only.
