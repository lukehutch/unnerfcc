<!--
name: 'Tool Result: Tool not run due to lack of auto mode safety verdict'
description: >-
  Informs the model that a tool was not run because auto mode safety check gave
  no result and no prompt is raised.
ccVersion: 2.1.318
-->
 was not run: only auto mode's safety check can allow it, and that check gave no result. No permission prompt is raised for this tool. This is not a judgment that the action is unsafe. Continue with work that doesn't need it, then tell the user that it was not run and why.
