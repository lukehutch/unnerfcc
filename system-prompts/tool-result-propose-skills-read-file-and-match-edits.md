<!--
name: 'Tool Result: Propose skills read file and match edits'
description: >-
  Instructs reading the target SKILL.md file and updating edit find strings or
  providing complete skillMd.
ccVersion: 2.1.321
variables:
  - ERROR_MESSAGE
  - FILE_PATH
-->
${ERROR_MESSAGE} (${FILE_PATH}). Read that file, then call again with edits that match it, or with the complete skillMd.
