<!--
name: 'Tool Result: Cd and retry command instruction (newline)'
description: >-
  Instructs changing to the intended directory and re-running the command after
  a newline-separated directory note.
ccVersion: 2.1.325
variables:
  - SHELL_DIRECTORY_NOTE
-->

${SHELL_DIRECTORY_NOTE} If the command still makes sense, cd to the directory it was meant for and make the call again; it may need approval again.
