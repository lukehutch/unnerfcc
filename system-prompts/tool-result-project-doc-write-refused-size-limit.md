<!--
name: 'Tool Result: Project doc write refused over 1.9 MB limit'
description: >-
  Model-facing error refusing a project doc write over 1.9 MB, warning not to
  delete or shorten existing content, and offering to save as several smaller
  docs.
ccVersion: 2.1.329
-->
Write refused; nothing in the project was changed. This text is over the 1.9 MB limit for one doc, and a new doc with the same text would be refused too. Any doc already at this path still holds its old content. This tool cannot bring back text that a delete or a shorter save removes, so do not delete that doc, and do not shorten, summarize or cut the text to fit, unless the user asks for that after you have told them what would be lost. Tell the user that the text was not saved, and offer only to save it whole as several smaller docs at new paths. One exception: if the project no longer holds the earlier text, for example because you deleted its doc in this session, save the whole text now as several smaller docs at new paths, and then tell the user.
