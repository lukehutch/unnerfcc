<!--
name: 'Tool Result: Artifact DB str_replace old_str not found'
description: >-
  Reports that old_str was not found in the specified document field, leaving
  the document unchanged at its current version.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - FIELD_NAME
-->
${ERROR_PREFIX}: old_str does not occur in ${FIELD_NAME} of that document, so nothing was written by this call. The document is still at version 
