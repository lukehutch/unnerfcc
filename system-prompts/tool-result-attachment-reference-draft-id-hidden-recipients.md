<!--
name: 'Tool Result: Attachment reference draftId hides recipients'
description: >-
  Rejects attaching files by reference to draftId because recipients are not
  verifiable during approval.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 call names a saved draft in "draftId", and the call doesn't show that draft's recipients, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. The saved draft wasn't changed. To attach the files, make a new draft: make the call again without "draftId", naming all of its recipients in "to", "cc" or "bcc".
