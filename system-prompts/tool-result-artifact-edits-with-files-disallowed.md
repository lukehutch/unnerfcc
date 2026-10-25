<!--
name: 'Tool Result: Artifact edits cannot accompany files map'
description: >-
  Explains that edits applies only to file_path and cannot be used alongside the
  files parameter.
ccVersion: 2.1.310
-->
`edits` changes only the file at `file_path`: not with `files` (publish the other files in a call without edits). Nothing was published.
