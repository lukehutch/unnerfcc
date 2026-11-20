<!--
name: 'Tool Result: Shader runtime-indexed list size limit'
description: >-
  Model-facing shader validation error stating a runtime-indexed list exceeds
  the maximum entries and advising use of table(rows).
ccVersion: 2.1.329
variables:
  - MAX_ENTRIES
  - ACTUAL_ENTRIES
-->
a list read or written at a run-time index holds 1 to ${MAX_ENTRIES} entries, and this has ${ACTUAL_ENTRIES}: use table(rows)
