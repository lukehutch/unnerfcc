<!--
name: 'Tool Result: REPL reset due to globalThis mutation'
description: >-
  Explains that mutating globalThis prevented subsequent execution and caused a
  context reset.
ccVersion: 2.1.318
-->
This REPL call did not run: an earlier script changed globalThis (for example, its prototype) in a way that stops new calls from starting. The REPL context was reset, so variables and functions from earlier calls are gone. Rerun this call's code, and don't change globalThis itself again.
