<!--
name: 'Tool Result: Project read text truncated call project_info'
description: >-
  Informs the model that only the first bytes of text are shown and advises
  calling project_info to access the full file.
ccVersion: 2.1.318
variables:
  - SHOWN_BYTES
  - TOTAL_BYTES
-->


[Only the first ${SHOWN_BYTES} of ${TOTAL_BYTES} bytes of this text are shown. To see the rest, call `project_info`: it can give a file that holds all of this text. `project_search` does not search it. Read or search only the parts of that file that the task needs.]
