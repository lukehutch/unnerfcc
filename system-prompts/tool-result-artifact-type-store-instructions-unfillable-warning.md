<!--
name: 'Tool Result: Artifact type store instructions unfillable warning'
description: >-
  Warns when an artifact type's store cannot be filled from this session and
  advises informing the user.
ccVersion: 2.1.273
variables:
  - FOLLOWUP_NOTE
-->
, as those instructions below describe (they cover only this Artifact's own content)${FOLLOWUP_NOTE}; otherwise it cannot be filled from here — tell the user that, and offer what those instructions suggest instead if they cover this case. Do not publish `file_path`/`files` to it as its content, and never index.html or any of the type's files.
