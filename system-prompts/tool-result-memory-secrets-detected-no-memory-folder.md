<!--
name: 'Tool Result: Content contains potential secrets'
description: >-
  Rejection when file content contains potential secrets and session has no
  memory folder, requiring sensitive content removal.
ccVersion: 2.1.310
variables:
  - SECRET_TYPES
-->
Content contains potential secrets (${SECRET_TYPES}) and cannot be written. This session has no memory folder, so every file it writes is checked as a memory file would be. Remove the sensitive content and try again.
