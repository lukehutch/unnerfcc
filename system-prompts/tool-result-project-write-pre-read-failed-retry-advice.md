<!--
name: 'Tool Result: Project write pre-read failed retry advice'
description: >-
  Advises retrying the write once without deleting the document, and offering
  content to the user if it fails.
ccVersion: 2.1.310
-->
. Try the same write once more. Do not delete the doc to retry: this tool cannot undo a delete. If it fails again, tell the user that the content was not saved, and offer it to them another way.
