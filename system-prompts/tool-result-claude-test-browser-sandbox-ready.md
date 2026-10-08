<!--
name: 'Tool Result: Claude Test browser sandbox ready'
description: >-
  Tells the model that Claude Test will try to start the test browser at the
  next run and instructs it to report BLOCKED and prompt the user to re-run.
ccVersion: 2.1.293
-->
Claude Test will try to start the test browser at the next run. Nothing to do: report BLOCKED "the test browser was not ready a moment ago: run /claude-test:run again" and end this run; the next run has the browser tools (no /mcp step). Do not use another browser.
