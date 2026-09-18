<!--
name: 'Tool Result: Artifact publish conflict stale version'
description: >-
  Warns that a newer version was published to the artifact and instructs
  fetching the URL again to merge edits.
ccVersion: 2.1.277
variables:
  - NEWER_VERSION
-->
[Version ${NEWER_VERSION} of this artifact was published after the version you have. Before you publish to it, fetch the artifact's URL again and merge your edits onto that version.]
