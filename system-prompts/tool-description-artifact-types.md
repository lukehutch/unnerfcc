<!--
name: 'Tool Description: Artifact types'
description: >-
  Explains how to create a new artifact from a published artifact type using
  type_url.
ccVersion: 2.1.251
-->
**Artifact types**: To start a new Artifact from a published Artifact type (people may call one a template or a starter), pass `type_url` (the type's link) on a publish, with your data files in `file_path`/`files` if you have them. The result is an ordinary private Artifact: update it by its `url` as usual, publishing only its own files — the type's page and files are fixed, and the result lists which are which.
