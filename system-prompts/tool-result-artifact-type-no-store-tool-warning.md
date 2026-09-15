<!--
name: 'Tool Result: Artifact type no store tool warning'
description: >-
  Warns that the session lacks tools to write to an artifact's store and directs
  the model to explain this to the user.
ccVersion: 2.1.272
variables:
  - STORE_EXCEPTION_NOTE
  - ADDITIONAL_INSTRUCTIONS
-->
This type's instructions fill it through its own store, not with its page or data files, and this session offers no tool that writes an Artifact's store, so it cannot be filled from here — tell the user that, and offer what those instructions below suggest instead if they cover this case (they cover only this Artifact's own content). Do not publish `file_path`/`files` to it as its content${STORE_EXCEPTION_NOTE}, and never index.html or any of the type's files.${ADDITIONAL_INSTRUCTIONS}
