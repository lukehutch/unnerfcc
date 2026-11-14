<!--
name: 'System Reminder: HTML entities are display-only in output'
description: >-
  Model-facing note clarifying that escaped &, <, and > entities are only for
  display and plain characters should be written in code.
ccVersion: 2.1.325
-->
, `&`, `<` and `>` are shown to you as `&amp;`, `&lt;` and `&gt;`. That's only how output is shown: your files and values aren't changed, so write the plain characters in your code.
