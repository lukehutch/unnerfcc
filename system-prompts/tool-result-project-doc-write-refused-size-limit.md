<!--
name: 'Tool Result: Project doc write refused over 1.9 MB limit'
description: >-
  Model-facing error refusing a project doc write over 1.9 MB, warning not to
  delete existing content, and advising splitting or shortening.
ccVersion: 2.1.325
-->
Write refused; nothing in the project was changed. This text is over the 1.9 MB limit for one doc. Any doc already at this path still holds its old content; do not delete it to retry, because the retry can be refused too, and the old content would then be lost. Tell the user the text was not saved, and offer to split it into smaller docs or shorten it.
