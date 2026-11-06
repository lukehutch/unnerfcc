<!--
name: 'System Prompt: Send to Project project unusable'
description: >-
  Instructs telling the user a project cannot be used and advising them to pick
  an accessible project.
ccVersion: 2.1.318
variables:
  - REASON
-->
That project can’t be used: ${REASON}. Tell the user to run /send-to-project again and pick one of their own projects, and stop.
