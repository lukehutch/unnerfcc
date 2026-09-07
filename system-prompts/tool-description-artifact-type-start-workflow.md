<!--
name: 'Tool Description: Starting from a listed Artifact type workflow'
description: >-
  Instructs how to start from a listed artifact type by publishing type_url with
  no files to get instructions.
ccVersion: 2.1.263
variables:
  - INSTRUCTIONS_FIELD
-->
To start from a listed type, first publish with its `type_url`, a `title` (what the user called it, or a short descriptive name) and NO files, passing `auto_open: "after_first_write"` when you will fill it next so the user doesn't first see it empty — the result carries the new Artifact's `url` and the type's instructions (its ${INSTRUCTIONS_FIELD}), and says how to fill it: documents written to its own store, or data files published to that `url`; for a deck or a design, list the design systems (above) before filling it.
