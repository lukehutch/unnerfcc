<!--
name: 'Tool Result: Artifact DB version changed or deleted (middle)'
description: >-
  Middle segment when a pinned document changed or was deleted, directing
  re-reading and re-planning.
ccVersion: 2.1.270
-->
, the one this write was pinned to — it has changed or may have been deleted; nothing was written. Read it back: if it still exists, re-plan the write against what it holds now and pin to its version; if it is gone, 
