<!--
name: 'Tool Result: Auto-mode classifier input empty'
description: >-
  Explains that a tool call was not reviewed because its classifier input was
  empty.
ccVersion: 2.1.270
-->
 was not reviewed: it gave the auto mode classifier nothing to judge (its toAutoClassifierInput is empty), and only the classifier can allow it. This is a tool bug, not a judgment on the action.
