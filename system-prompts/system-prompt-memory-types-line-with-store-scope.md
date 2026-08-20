<!--
name: 'System Prompt: Memory type line (store-scope variant)'
description: >-
  Variant of the memory-type line used when a writable shared store is
  connected, leaving a trailing space before the clause naming which store each
  type goes to.
ccVersion: 2.1.231
variables:
  - MEMORY_TYPE_DEFINITIONS
-->
Each memory has a type: ${MEMORY_TYPE_DEFINITIONS} 
