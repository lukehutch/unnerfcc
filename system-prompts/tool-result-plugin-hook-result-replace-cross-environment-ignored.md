<!--
name: 'Tool Result: Plugin hook result replace cross-environment ignored'
description: >-
  Informs the model that a plugin hook cannot replace tool results across
  environments so the original result was kept.
ccVersion: 2.1.293
-->
A plugin hook tried to replace this tool call's result. It may do that only for tools that run in the same environment as the hook, and this tool does not, so the original result was kept and is what Claude read.
