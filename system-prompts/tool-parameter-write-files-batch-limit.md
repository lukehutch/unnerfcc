<!--
name: 'Tool Parameter: write_files batch limit'
description: >-
  Describes the write_files argument for file contents and caps it at 256 files
  per call, requiring larger bundles to be split across calls under the same
  planId.
ccVersion: 2.1.219
-->
write_files: file contents to write (max 256 per call — split larger bundles across multiple write_files calls under the same planId).
