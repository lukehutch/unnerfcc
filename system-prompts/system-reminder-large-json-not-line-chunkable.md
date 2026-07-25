<!--
name: 'System Reminder: Large JSON is not line-chunkable'
description: >-
  Tells the model to probe the file's structure with jq and extract slices with
  jq or python because Read's line-based offset/limit cannot chunk it.
ccVersion: 2.1.219
variables:
  - FILE_PATH
-->
first probe the structure (e.g., jq 'type, length, keys?' ${FILE_PATH}), then extract slices with jq or python — Read's line-based offset/limit will not chunk this file.
