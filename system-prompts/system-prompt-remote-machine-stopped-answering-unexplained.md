<!--
name: 'System Prompt: Remote machine stopped answering unexplained'
description: >-
  Explains that the machine stopped answering checks and opening Claude with
  computer awake and online will restore it.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
it stopped answering this session's checks without saying why, which most often means Claude on ${MACHINE_NAME} is no longer running (the app was closed, say) or lost its connection, or the computer went to sleep or offline; what brings it back is Claude open on ${MACHINE_NAME} again with the computer awake and online.
