<!--
name: 'Tool Description: Artifact update workflow'
description: >-
  Instructions for updating artifacts within the session or from earlier
  conversations using the URL.
ccVersion: 2.1.310
-->
**To update** an artifact published earlier in this conversation, Claude calls Artifact again with the same file path, which redeploys it to the same URL. A different path creates a new URL, so Claude changes the path only when it wants a separate artifact.
