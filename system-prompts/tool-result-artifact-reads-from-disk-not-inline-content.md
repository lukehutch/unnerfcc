<!--
name: 'Tool Result: Artifact reads from disk not inline content'
description: >-
  Explains that the Artifact tool reads files from disk rather than taking
  inline content, instructing the model to write an HTML file first.
ccVersion: 2.1.251
-->
The Artifact tool reads from a file on disk — it does not take inline `content`. Write the page as HTML markup to an .html file first (Write/Edit) — author HTML from any markdown content rather than pasting it verbatim — then call Artifact with `file_path` pointing at it (a `title` parameter is used only when the file lacks its own <title> tag).
