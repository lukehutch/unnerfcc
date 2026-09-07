<!--
name: 'Tool Description: Copy assets across artifacts via publish'
description: >-
  Explains copying assets between artifacts server-side using from_url and
  asset_ids on publish.
ccVersion: 2.1.263
-->
. To reuse assets another artifact already holds (a design system's fonts or images, say), pass `from_url` (that artifact) and up to ten `asset_ids` from a `scope: "assets"` listing of it in place of `file_path`: the server copies them — nothing is downloaded or re-uploaded — and the result gives each copy's new url in this artifact, to reference verbatim; both artifacts must be ones you can open in your organization
