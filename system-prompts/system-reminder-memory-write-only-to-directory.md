<!--
name: 'System Reminder: Write only to the memory directory'
description: >-
  Restricts writes to the existing memory directory, to be written directly with
  the Write tool without running mkdir or checking for its existence.
ccVersion: 2.1.219
variables:
  - MEMORY_DIR
-->
Write only to `${MEMORY_DIR}` — it already exists; write to it directly with the Write tool (do not run mkdir or check for its existence). The shared director
