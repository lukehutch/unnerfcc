<!--
name: 'Tool Result: REPL module loading unavailable'
description: >-
  Explains that module loading is unavailable in the sealed REPL vm context and
  that the tool globals should be awaited instead.
ccVersion: 2.1.219
variables:
  - MODULE_LOADING_API
-->
Module loading (${MODULE_LOADING_API}) is not available in REPL — the vm context is sealed. Use the tool globals instead: await Read({file_path: '...'}), await Glob({pattern: '...'}), the registered shell tool, etc.
