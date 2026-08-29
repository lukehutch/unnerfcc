<!--
name: 'Tool Result: Artifact Delete Confirmation Cloud Relay Failed'
description: >-
  Reports that confirming artifact deletion failed due to a cloud relay error
  and advises listing before retrying.
ccVersion: 2.1.251
variables:
  - ERROR_MESSAGE
-->
Couldn't confirm the delete (the cloud relay failed: ${ERROR_MESSAGE}) — it may have gone through; check with action "list" before telling the user or trying again.
