<!--
name: 'Tool Result: Artifact DB str_replace multiple occurrences'
description: >-
  Reports that old_str occurs more than once in the document field and advises
  including more context or passing replace_all.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - FIELD_NAME
  - VERSION_NOTE
-->
${ERROR_PREFIX}: old_str occurs more than once in ${FIELD_NAME} of that document; nothing was written.${VERSION_NOTE} Include more surrounding text so it is unique, or pass replace_all to change every occurrence
