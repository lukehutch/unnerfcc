<!--
name: 'Tool Result: Project write document too large for inline rewrite'
description: >-
  Refuses rewrite of large document because inline display was truncated,
  requiring local_path or a new path.
ccVersion: 2.1.310
variables:
  - MAX_BYTES
-->
Write refused; nothing in the project was changed. The doc at this path holds more than ${MAX_BYTES} bytes, more than project_read shows inline, so a rewrite typed from what it showed you would drop the rest. Do not delete the doc to write it again unless the user asks: a delete cannot be undone here. If you have the whole new text in a file that this session accepts as `local_path`, pass that file, but not a file made from only part of the doc. Otherwise write the new text to a new path, and tell the user that this doc is too large to rewrite here.
