<!--
name: 'Tool Result: Attachment reference send draft hides recipients'
description: >-
  Rejects sending a saved draft by draftId with file references due to
  unverified recipients.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 call sends the saved draft that "draftId" names, and the call doesn't show that draft's recipients, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make a new draft with 
