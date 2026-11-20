<!--
name: 'Tool Result: Artifact query cursor pagination rule'
description: >-
  Model-facing validation rule explaining that query.cursor must be the
  unchanged next_cursor from the previous page of the same read.
ccVersion: 2.1.329
-->
`query.cursor` is the `next_cursor` of the previous page of the same read, unchanged; without it the read starts from the first page
