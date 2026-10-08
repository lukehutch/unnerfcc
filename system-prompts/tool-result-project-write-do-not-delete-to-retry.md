<!--
name: 'Tool Result: Project write do not delete to retry'
description: >-
  Warns against deleting a document to retry a save because failed retries would
  cause document loss.
ccVersion: 2.1.293
-->
Do not delete it to retry: this tool cannot undo a delete, and if the retry failed too, the doc would be lost.
