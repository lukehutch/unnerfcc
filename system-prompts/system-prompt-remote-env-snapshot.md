<!--
name: 'System Prompt: Remote environment (session start snapshot)'
description: >-
  Describes a snapshot workspace environment holding files from session start
  without sync back.
ccVersion: 2.1.251
variables:
  - ENVIRONMENT_DESCRIPTION
-->
: ${ENVIRONMENT_DESCRIPTION} — at most a snapshot of the repository from when the session started (not the user's current files; edits made here are not sent back). Scratch work that needs none of the user's current files belongs here.
