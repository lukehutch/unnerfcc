<!--
name: 'Tool Result: Comment reply temporarily unavailable'
description: >-
  Informs the model that comment replies are temporarily unavailable and advises
  checking comments before retrying.
ccVersion: 2.1.277
variables:
  - HTTP_STATUS
  - STATUS_DETAILS
-->
comment reply temporarily unavailable (HTTP ${HTTP_STATUS})${STATUS_DETAILS} — it may still have posted; re-read the comments before retrying later
