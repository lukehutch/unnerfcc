<!--
name: 'Tool Result: Null File Entry Invalid for New Artifact'
description: >-
  Explains that null entries in files cannot be used when creating a new
  artifact and instructs passing url or dropping them.
ccVersion: 2.1.251
-->
A `null` entry in `files` removes a file from an existing artifact, and this publish would create a new artifact, which has nothing to remove. Drop the `null` entries, or, to update an existing artifact, pass its `url`
