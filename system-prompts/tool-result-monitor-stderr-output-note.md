<!--
name: 'Tool Result: Monitor command wrote to stderr'
description: >-
  Model-facing notice that a monitor command wrote to stderr, which is not
  delivered as events, and pointing to the output file.
ccVersion: 2.1.329
variables:
  - STDERR_OUTPUT_PATH
-->
Its command wrote to stderr, which isn't delivered as events and may mean it failed: see `${STDERR_OUTPUT_PATH}`. 
