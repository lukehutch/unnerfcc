<!--
name: 'Tool Description: REPL file.content behavior'
description: >-
  Model-facing REPL documentation note explaining that reading a local text file
  returns its full content in file.content without line numbers unless offset or
  limit is passed.
ccVersion: 2.1.329
-->
- For a text file on this machine, a script gets the text in `file.content`, with no line numbers: the whole file (up to 256 MiB) unless it passes `offset` or `limit`
