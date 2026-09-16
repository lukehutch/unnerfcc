<!--
name: 'Data: Artifact canvas index schema v3'
description: Specifies the JSON schema and properties for a version 3 canvas index file.
ccVersion: 2.1.273
-->
`"v": 3`, `title`, `boards`: one entry per artboard, keyed by its file name, holding its frame on the canvas (`x`, `y`, `w`, `h` in CSS px) and its options, `order`: those names back to front, and `notes`, `pages` and `launch` when the canvas has them
