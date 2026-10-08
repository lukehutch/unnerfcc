<!--
name: 'Tool Result: Start task cloud environment read limits refusal'
description: >-
  Informs the model that file attachments are refused because file reading
  limits cannot be applied in the cloud environment.
ccVersion: 2.1.293
variables:
  - REASON
  - NEXT_STEPS
-->
Cannot attach files: this session's limits on reading files cannot be applied in its cloud environment, where the upload would happen. ${REASON} ${NEXT_STEPS}
