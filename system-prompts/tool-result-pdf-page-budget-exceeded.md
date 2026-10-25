<!--
name: 'Tool Result: PDF page budget exceeded'
description: >-
  Informs the model that the PDF page limit for the context has been reached and
  directs answering from pages already read.
ccVersion: 2.1.310
variables:
  - PAGES_REQUESTED
  - PAGE_CAP
  - FILE_PATH
-->
The context has filled up once already, and ${PAGES_REQUESTED} PDF pages have been asked for; the most before you give your answer is ${PAGE_CAP}. "${FILE_PATH}" was not read. Read no more PDF pages now: answer from what you have read, tell the user which pages you did not reach, and that they can ask you to go on in their next message.
