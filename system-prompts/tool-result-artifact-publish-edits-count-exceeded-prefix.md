<!--
name: 'Tool Result: Artifact publish edits count exceeded prefix'
description: >-
  Prefix reporting that the number of edits for a file of this size exceeds what
  one publish call can apply.
ccVersion: 2.1.310
variables:
  - EDIT_COUNT
  - FILE_CHARACTERS
-->
${EDIT_COUNT} edits on a file of ${FILE_CHARACTERS} characters is more than one publish call will apply; send at most 
