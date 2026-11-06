<!--
name: 'Tool Description: REPL output format and dispatch'
description: >-
  Explains synchronous repl-output elements and asynchronous dispatched status
  for running scripts.
ccVersion: 2.1.318
-->
 s comes back as the `REPL` call's own result, a `<repl-output eval="N">` element holding `<log>` lines and the `<result>` (or `<error>`). One still running by then returns `(dispatched #N)` instead, runs on, and no longer holds up the scripts after it: its output arrives as an 
