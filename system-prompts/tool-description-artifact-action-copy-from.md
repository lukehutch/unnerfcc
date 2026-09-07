<!--
name: 'Tool Description: Artifact copy_from action'
description: >-
  Describes the copy_from action for copying assets server-side from another
  artifact within the same organization.
ccVersion: 2.1.263
-->
 'copy_from' copies named assets of ANOTHER artifact you can open into this one's asset store, server side — pass `url` (the destination), `from_url` (the source, same organization) and `asset_ids` (from the source's list_assets); each copy gets a new id and url in the destination.
