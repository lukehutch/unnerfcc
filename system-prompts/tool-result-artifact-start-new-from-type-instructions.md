<!--
name: 'Tool Result: Start new Artifact from type instructions'
description: >-
  Guidance on how to instantiate an Artifact from a type, read its instructions,
  and publish data files.
ccVersion: 2.1.251
-->
To start a new Artifact from one, publish with its `type_url` and no files first — the result carries the type's instructions for its data files — then publish the data files to the returned `url`. `action: "describe_type"` with a `type_url` shows a type's files first if you need them.
