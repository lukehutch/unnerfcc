<!--
name: 'Tool Description: Artifact types (instructions-first flow)'
description: >-
  Explains the workflow for creating an artifact from a type, including
  publishing with no files to inspect instructions first.
ccVersion: 2.1.251
-->
**Artifact types**: To start a new Artifact from a published Artifact type (people may call one a template or a starter), pass `type_url` (the type's link) on a publish: with no files when you have not yet seen the type's instructions (the result carries them), or with your data files in `file_path`/`files` when you already know what the type expects. The result is an ordinary private Artifact: update it by its `url` as usual, publishing only its own files — the type's page and files are fixed, and the result lists which are which.
