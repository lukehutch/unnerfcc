<!--
name: 'Tool Result: Start new Artifact from type instructions'
description: >-
  Guidance on how to instantiate an Artifact from a type, read its instructions,
  and publish data files.
ccVersion: 2.1.270
-->
To start a new Artifact from one, publish with its `type_url`, a `title` (what the user called it, or a short descriptive name) and no files first (passing `auto_open: "after_first_write"` when you will fill it next) — the result carries the new Artifact's `url` and the type's instructions, and says how to fill it: documents written to its own store, or data files published to that `url`.
