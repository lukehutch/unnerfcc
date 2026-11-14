<!--
name: 'Tool Result: Remote background task tracking payload too large'
description: >-
  Model-facing error stating a remote background task is being cancelled because
  its tracking metadata was too large or deeply nested.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
-->
The tool started a background task on ${MACHINE_NAME}, but what its server sent to follow the task by was too large or too deeply nested to hand on, so the task is being cancelled. Nothing more of it will arrive.
