<!--
name: 'Data: Artifact slide path format'
description: >-
  Defines the file path convention and section format for individual slide files
  in a presentation artifact.
ccVersion: 2.1.273
-->
one `project/slides/<id>.html` per slide, <id> being its entry in the index's `order`, each holding exactly one `<section id="<id>">` in the slide format with, as that section's last child, one `<aside>` of plain-text speaker notes when the slide has any
