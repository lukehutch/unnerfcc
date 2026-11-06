<!--
name: 'Tool Result: REPL unsupported syntax requiring import helpers'
description: >-
  Rejects scripts utilizing syntax features like decorators or using
  declarations that require runtime import helpers.
ccVersion: 2.1.318
-->
This script uses syntax that REPL code cannot run, such as a decorator, an `accessor` field or a `using` declaration: it needs helper functions that are loaded by import, and REPL code cannot import.
