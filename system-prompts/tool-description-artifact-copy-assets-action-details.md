<!--
name: 'Tool Description: Copy assets across artifacts action details'
description: >-
  Explains how to copy up to ten assets from another artifact using action
  copy_from.
ccVersion: 2.1.277
-->
 `action: "copy_from"` with the destination's `url`, the source artifact's `from_url` and up to ten `asset_ids` from the source's list_assets reuses assets another artifact already holds, such as a design system's fonts: the server copies them and the result gives each copy's new url, to reference exactly as given; both artifacts must be ones the person can open.
