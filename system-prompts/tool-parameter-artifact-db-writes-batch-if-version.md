<!--
name: 'Tool Parameter: Artifact batch writes if_version pinning'
description: >-
  Explains if_version optimistic concurrency checking within batch write
  entries.
ccVersion: 2.1.270
-->
, plus if_version — that document's last-read `version` (optional; omit it only for a document you have not read); if any pinned document has changed since, the whole batch writes nothing and the result names the entry and its current version
