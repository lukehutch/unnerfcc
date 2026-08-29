<!--
name: 'Agent Prompt: Artifact comment unknown page marker rule'
description: >-
  Instructs not to assume the comment is on the main page when the unknown page
  marker is emitted by the tool.
ccVersion: 2.1.251
variables:
  - UNRESOLVED_PAGE_MARKER
-->
 The line "${UNRESOLVED_PAGE_MARKER}" was emitted by the tool: which page of this multi-file artifact the thread is on is unknown this turn — do not assume the main page.
