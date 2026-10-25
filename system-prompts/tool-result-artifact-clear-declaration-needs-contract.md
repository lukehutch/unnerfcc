<!--
name: 'Tool Result: Clear stored declaration needs contract'
description: >-
  Informs the model that clearing stored declarations requires the current
  contract and must be executed from an authorized session.
ccVersion: 2.1.310
variables:
  - ALLOWED_SESSION_DESCRIPTION
-->
Nothing was cleared: clearing a stored declaration needs the current contract, so any stored grants are still live. Tell the user that, and that the declaration has to be cleared from ${ALLOWED_SESSION_DESCRIPTION}.
