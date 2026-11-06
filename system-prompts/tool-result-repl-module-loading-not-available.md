<!--
name: 'Tool Result: REPL module loading not available'
description: >-
  Explains that import/require is unavailable in the sealed VM and directs using
  tool globals.
ccVersion: 2.1.318
variables:
  - MODULE_LOAD_SYNTAX
-->
Module loading (${MODULE_LOAD_SYNTAX}) is not available in REPL — the vm context is sealed. Use the tool globals instead: await Read({file_path: '...'}), await Glob({pattern: '...'}), the registered shell tool, etc.
