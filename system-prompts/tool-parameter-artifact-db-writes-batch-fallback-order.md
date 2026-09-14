<!--
name: 'Tool Parameter: Artifact batch writes sequential execution and preference'
description: >-
  Explains sequential batch execution and recommends batching over separate
  write_db calls.
ccVersion: 2.1.270
-->
in order one at a time (the result says which). Prefer it over separate write_db calls whenever you write more than a couple of documents.
