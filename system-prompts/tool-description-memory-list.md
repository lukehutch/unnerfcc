<!--
name: 'Tool Description: Memory list'
description: >-
  Model-facing description of the memory list tool — paths, sizes, and update
  times for the documents in a store, with paging, path-prefix narrowing, and
  the no-argument call that reports the connected stores.
ccVersion: 2.1.231
variables:
  - MEMORY_READ_TOOL_NAME
-->
List memory documents (optionally under a path prefix), sorted by path. Returns path, size, and last-updated time for each. Results are capped; use cursor to page through large stores, or narrow with path_prefix. Use ${MEMORY_READ_TOOL_NAME} for content. Pass store (a connected store's id) to list that store; call with no arguments to list the memory stores connected to this session — their ids, a one-line description, whether each is writable or read-only, and the path of each store's index document.
