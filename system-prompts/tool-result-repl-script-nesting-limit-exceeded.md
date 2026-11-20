<!--
name: 'Tool Result: REPL script nesting limit exceeded'
description: >-
  Model-facing REPL error rejecting a script that exceeds the maximum syntax
  nesting depth and suggesting a loop or JSON.parse.
ccVersion: 2.1.329
variables:
  - MAX_NESTING_DEPTH
-->
This script is nested too deeply: the limit is ${MAX_NESTING_DEPTH} levels of syntax. Build a deep value with a loop or JSON.parse.
