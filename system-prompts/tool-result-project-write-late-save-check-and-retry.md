<!--
name: 'Tool Result: Project write late save check and retry'
description: >-
  Advises checking project_read for late saves and retrying project_write up to
  twice before offering an alternative.
ccVersion: 2.1.293
-->
 The content may not be in the project. Call project_read on this path: if it returns the content, the save went through late; if not, try the same project_write again, up to two retries in total. If it still fails, tell the user that it was not saved, and offer it to them another way.
