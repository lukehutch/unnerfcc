<!--
name: 'Tool Description: Copy assets across artifacts action details'
description: >-
  Explains how to copy up to ten assets from another artifact using action
  copy_from.
ccVersion: 2.1.263
-->
 To reuse assets another artifact already holds (a design system's fonts or images, say), pass `action: "copy_from"` with the destination's `url`, the source's `from_url`, and up to ten `asset_ids` from the source's list_assets — the server copies them (nothing is downloaded or re-uploaded) and the result gives each copy's new url in the destination (reference it verbatim); both artifacts must be ones you can open in your organization.
