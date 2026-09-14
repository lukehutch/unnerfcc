<!--
name: 'Tool Result: Artifact DB str_replace not found retry guidance'
description: >-
  Guides the model on how to handle an old_str mismatch in str_replace by
  checking whether an earlier call applied or re-reading after concurrent
  changes.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - FIELD_NAME
  - VERSION_NOTE
-->
${ERROR_PREFIX}: old_str does not occur in ${FIELD_NAME} of that document, so nothing was written by this call.${VERSION_NOTE} Copy the text exactly as it appears in the field's value (the decoded string, not JSON-escaped source). If you were retrying after a call whose outcome you did not see, that earlier call may already have applied — read the document back before trying again. If someone else changed that text, re-read and re-plan the edit
