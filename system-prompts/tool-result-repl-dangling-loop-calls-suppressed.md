<!--
name: 'Tool Result: REPL dangling loop calls suppressed'
description: >-
  Explains that repetitive calls from an orphaned loop or promise chain in
  finished code have been suppressed.
ccVersion: 2.1.318
-->
Code that had already finished left a loop or promise chain running, and it kept making calls. Finished code can run no tool, so its calls now get no answer and it has stopped. To run these steps, send them again in one piece of code that awaits each of them.
