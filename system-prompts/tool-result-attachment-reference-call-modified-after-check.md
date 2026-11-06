<!--
name: 'Tool Result: Attachment reference call modified after permission check'
description: >-
  Rejects an email call whose parameters changed after approval when attaching
  files by reference.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 call was changed after its permission check, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Tell the user the call was changed after it was checked, and ask what they'd like to do.
