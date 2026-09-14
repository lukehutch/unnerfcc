<!--
name: 'Tool Result: Start new Artifact from type instructions'
description: >-
  Guidance on how to instantiate an Artifact from a type, read its instructions,
  and publish data files.
ccVersion: 2.1.270
-->
To start from a type, Claude publishes with its `type_url`, a `title` and no files. The result is an ordinary private Artifact that carries its `url`, the type's instructions and how to fill it (the type's own store, or Claude's data files published to that `url`). Claude updates it by its `url` as usual and changes only its own files, because the type's page and files stay fixed.
