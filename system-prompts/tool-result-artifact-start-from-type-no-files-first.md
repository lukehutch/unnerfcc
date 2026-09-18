<!--
name: 'Tool Result: Start from type no files first'
description: >-
  Instruction suffix to publish with type_url and no files first, then publish
  data files to the returned url.
ccVersion: 2.1.277
-->
, a `title` (what the user called it, or a short descriptive name) and no files first (passing `auto_open: "after_first_write"` when your next step publishes files to it or writes its store, never for a type whose content you write through a connector, such as a Claude Docs document); the create result carries the new Artifact's `url` and the type's instructions, and says how to fill it — documents written to its own store, or data files published to that `url`.
