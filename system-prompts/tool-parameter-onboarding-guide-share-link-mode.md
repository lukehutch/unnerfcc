<!--
name: Onboarding guide share-link mode param
description: >-
  inputSchema param of the onboarding-guide share-link tool documenting the
  check/update/create/delete modes; model-facing.
ccVersion: 2.1.191
-->
'check' (default): if ONBOARDING.md is present locally, uploads it to the most-recent guide (creates one if none exist); otherwise reports the existing link without uploading. 'update': upload to a specific guide by short_code. 'create': always make a new link. 'delete': remove a guide.
