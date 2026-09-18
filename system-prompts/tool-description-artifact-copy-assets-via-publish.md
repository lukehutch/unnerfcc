<!--
name: 'Tool Description: Copy assets across artifacts via publish'
description: >-
  Explains copying assets between artifacts server-side using from_url and
  asset_ids on publish.
ccVersion: 2.1.277
-->
. To reuse assets another artifact already holds, such as a design system's fonts or images, Claude passes `from_url` (that artifact) and up to ten `asset_ids` from a `scope: "assets"` listing of it in place of `file_path`: the server copies them without downloading or re-uploading, and the result gives each copy's new url in this artifact, to reference exactly as given; both artifacts must be ones the person can open
