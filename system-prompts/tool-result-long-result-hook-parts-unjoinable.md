<!--
name: 'Tool Result: Long result hook parts unjoinable'
description: >-
  Model-facing tool result explaining that a long tool result was not delivered
  because plugin hook responses to its parts could not be joined, and advising
  smaller reads or not retrying mutating calls.
ccVersion: 2.1.329
-->
The tool's result was not delivered. It is long, so plugin hooks are shown it in parts, and a hook's answers to the parts can't be joined. If the call only reads, ask for less at a time (for a file, use offset and limit). If it changes something, it has run: don't make it again.
