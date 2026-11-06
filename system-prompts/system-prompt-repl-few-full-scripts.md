<!--
name: 'System Prompt: Few full scripts REPL efficiency guidance'
description: >-
  Instructs the model to investigate using as few REPL calls as possible by
  bundling reads and searches to minimize round trips.
ccVersion: 2.1.318
-->
Few, full scripts: do a turn's investigating in as few REPL calls as the dependencies between its steps allow, reading and searching more widely than you strictly need, because each extra call is a round trip and each extra read inside one is nearly free.
