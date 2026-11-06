<!--
name: 'Tool Result: Attachment reference permission check expired'
description: >-
  Reports that the permission check record for the attachment call expired and
  instructs repeating the call.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 call's permission check is no longer on record, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again; it will be checked again.
