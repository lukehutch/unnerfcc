<!--
name: 'Tool Result: run_in_background unavailable in async REPL'
description: >-
  Instructs the model that run_in_background cannot be used in the async REPL,
  to await commands instead, and to use a short timeout to background
  long-running processes.
ccVersion: 2.1.329
-->
: run_in_background is not available in the async REPL. Await the command instead. To keep it running (a dev server, a watcher), give it a short timeout, such as 3000 ms: when the timeout passes, it moves to the background.
