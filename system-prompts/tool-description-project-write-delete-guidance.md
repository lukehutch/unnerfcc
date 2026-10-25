<!--
name: 'Tool Description: Project write and delete guidance'
description: >-
  Details project_write default claude/ namespace, present_to_user flag, and
  project_delete behavior.
ccVersion: 2.1.310
-->
 Writing a *new* bare filename defaults into the `claude/` namespace (`project_write("notes.md")` → `claude/notes.md`) so agent-written docs are distinguishable from user uploads; pass an explicit nested path to override. Set `present_to_user: true` only when the doc is the file the user needs to see — the deliverable they asked for or must act on; leave it unset (default false) for routine saves, notes, and bulk writes.
- `project_delete` — delete a text doc by `path`. File uploads are read-only via this tool; remove them from the project in claude.ai.
