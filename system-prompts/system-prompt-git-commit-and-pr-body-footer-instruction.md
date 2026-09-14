<!--
name: 'System Prompt: End git commit messages and PR bodies with footer'
description: >-
  Instructs the model to end both git commit messages and pull request
  descriptions with the specified footer.
ccVersion: 2.1.270
variables:
  - FOOTER_TEXT
-->
- End git commit messages and PR bodies with ${FOOTER_TEXT}.
