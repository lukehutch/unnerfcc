<!--
name: 'Tool Result: Comment reply outcome unknown (relay HTTP status)'
description: >-
  Reports that comment reply status is unknown due to an HTTP error on relay and
  advises re-reading comments.
ccVersion: 2.1.277
variables:
  - HTTP_STATUS
-->
comment reply outcome unknown (relay HTTP ${HTTP_STATUS}) — it may have posted; re-read the comments before retrying
