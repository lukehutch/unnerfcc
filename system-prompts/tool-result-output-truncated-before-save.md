<!--
name: 'Tool Result: Output truncated before saving'
description: >-
  Model-facing note warning that saved output was truncated mid-structure before
  writing to disk and that searches over the file only cover the saved prefix.
ccVersion: 2.1.329
-->

Note: the output was cut before it was saved; the saved file contains only the first part of it, after a line that says so, and ends mid-structure (a JSON parse of the whole file fails). A search or a count over the file covers that part alone.
