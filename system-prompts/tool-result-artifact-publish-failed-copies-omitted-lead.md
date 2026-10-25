<!--
name: 'Tool Result: Artifact publish failed copies omitted lead'
description: >-
  Lead message explaining that nothing was published because the server left out
  copied files.
ccVersion: 2.1.310
variables:
  - FILE_COUNT_OR_SUMMARY
  - FILES_NOUN
-->
Nothing was published, and the artifact is unchanged: the server left out ${FILE_COUNT_OR_SUMMARY} copied ${FILES_NOUN}
