<!--
name: 'Tool Result: Project write doc changed since last read retry advice'
description: >-
  Refuses write because the document changed since last read or written,
  instructing to call project_read and update.
ccVersion: 2.1.321
-->
Write refused; nothing in the project was changed. The doc at this path has changed since you last read or wrote it in this conversation. Call project_read on this path, make your change in the text that it returns, and write again. If project_read cannot show the whole text inline, follow what its result tells you instead; if the write is refused again, tell the user that the new content was not saved, and offer it to them another way. Do not delete the doc to write it afresh.
