<!--
name: DesignSync paths parameter
description: >-
  inputSchema param description for the DesignSync paths field covering
  delete_files and unregister_assets, with the per-call batch cap.
ccVersion: 2.1.219
-->
delete_files: paths to delete. unregister_assets: paths whose Design System pane card should be removed. Max 256 per call — split larger batches across multiple calls under the same planId.
