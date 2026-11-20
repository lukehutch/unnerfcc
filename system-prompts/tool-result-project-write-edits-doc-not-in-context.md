<!--
name: 'Tool Result: project_write edits doc not in context'
description: >-
  Refuses edits because the full current text of the doc is not in context and
  directs calling project_read first.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
-->
${REFUSAL_PREFIX} This tool cannot find the doc's whole current text in your context. Call project_read on this path. If it shows the whole text, send the blocks again against that text. If it does not, follow what its result tells you: edits cannot be used for this doc.
