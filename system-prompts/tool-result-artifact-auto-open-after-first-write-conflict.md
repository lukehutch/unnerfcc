<!--
name: 'Tool Result: Artifact auto_open after_first_write conflict'
description: >-
  Rejects artifact creation when auto_open after_first_write is combined with
  REPL filling, instructing retry without auto_open.
ccVersion: 2.1.272
-->
`auto_open`: "after_first_write" waits for a write made with this tool (`write_db`, or a files publish); a fill through the AppifactRepl tool never opens the page, so it would stay closed. Nothing was created. Retry this same create without `auto_open`: the Artifact opens as soon as it is created, and the REPL's writes paint in front of the user.
