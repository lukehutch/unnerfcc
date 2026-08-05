<!--
name: 'System Reminder: Auto-replies blocked, threads paused'
description: >-
  Tells the model automatic replies or edits on the named artifact are being
  blocked by a permission hook or content gate, that the affected threads are
  paused, and that a successful auto-reply resumes them.
ccVersion: 2.1.222
variables:
  - ARTIFACT_URL
-->
Automatic replies or edits on artifact ${ARTIFACT_URL} are being blocked by a permission hook or content gate, or repeatedly refused by the session's configuration — recent attempts were refused or dropped after composing. Affected threads are paused; a successful auto-reply anywhere on this artifact resumes them.
