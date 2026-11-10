<!--
name: 'Tool Result: Project write file doc changed retry advice'
description: >-
  Refuses file-based project write because the document changed, instructing to
  re-read and update the local file.
ccVersion: 2.1.321
-->
Write refused; nothing in the project was changed. The doc at this path has changed since you last read or wrote it in this conversation. Call project_read on this path, make your change from the text that it shows or saves whole, write the file again, and repeat this project_write. If it says that only part of the doc was saved or shown, or the write is refused again, tell the user that the new content was not saved, and offer it to them another way. Do not delete the doc to write it afresh.
