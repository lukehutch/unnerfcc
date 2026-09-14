<!--
name: 'Tool Result: Artifact DB batch doc changed or deleted (trailer)'
description: >-
  Instructs handling a changed or deleted document in a batch by re-reading and
  re-planning or dropping/re-creating the entry.
ccVersion: 2.1.270
variables:
  - FIRST_STALE_PIN_NOTE
-->
 and that document has changed or may have been deleted (the server named no current version): read it back — if it still exists, re-plan its write against what it holds now and pin to its version; if it is gone, drop that entry, or re-create it with a "set" entry and no if_version only if it should exist again. ${FIRST_STALE_PIN_NOTE}
