<!--
name: 'Tool Result: Artifact copy_from source unreachable'
description: >-
  Informs the model that the source artifact for copying assets does not exist,
  cannot be opened, or cannot be copied from.
ccVersion: 2.1.277
variables:
  - ACTION_NAME
-->
${ACTION_NAME}: the SOURCE Artifact (from_url) does not exist, is not one this session can open, or cannot be copied from — the cases are deliberately indistinguishable; check from_url with action "list", scope "shared"
