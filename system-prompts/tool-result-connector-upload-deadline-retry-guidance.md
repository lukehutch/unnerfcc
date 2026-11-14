<!--
name: 'Tool Result: Connector upload deadline retry guidance'
description: >-
  Instructs the model not to retry on its own after an upload deadline expires
  and to ask the user before starting a new upload.
ccVersion: 2.1.325
variables:
  - EXTRA_NOTE
-->
. ${EXTRA_NOTE} Don't retry on your own. Tell the user the file wasn't sent, and ask before trying again. A new call starts a new upload with a new deadline and may work.
