<!--
name: 'Tool Description: Memory read (detailed)'
description: >-
  Model-facing description of the memory read tool — read one document by store
  id and path, and carry its version token into the next write of that path.
ccVersion: 2.1.231
variables:
  - MEMORY_WRITE_TOOL_NAME
-->
Read one memory document from a memory store by its store id and path. The result carries the document's version token — pass it as if_version when you next ${MEMORY_WRITE_TOOL_NAME} this path in the same store.
