<!--
name: 'Tool Result: copy_from requires asset_ids parameter'
description: >-
  Validation error stating that copy_from requires asset_ids within the allowed
  count range.
ccVersion: 2.1.263
variables:
  - MAX_ASSETS
-->
action "copy_from" requires `asset_ids` — 1–${MAX_ASSETS} asset ids from the source artifact (its list_assets result).
