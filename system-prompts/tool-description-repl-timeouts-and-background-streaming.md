<!--
name: 'Tool Description: REPL timeouts and background streaming'
description: >-
  Explains command timeout capping at 600000 ms and background task output
  streaming.
ccVersion: 2.1.318
-->
Timeouts cap at 600000 ms: past that the command keeps running in the background, and running names the task and the file its output streams to, so that file can be read instead of running the command again.
