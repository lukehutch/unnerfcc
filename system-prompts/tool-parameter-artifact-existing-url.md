<!--
name: 'Tool Parameter: Artifact existing URL'
description: >-
  url field of the artifact publish tool — pass an existing artifact URL to
  update it in place instead of minting a new one.
ccVersion: 2.1.251
-->
Existing artifact URL to update in place. Pass whenever the user wants to update an artifact this conversation did not publish — "update my artifact", "keep the same link", a pasted artifact URL — and find the URL with action: "list" or ask the user for the link if you don't have it; without this, the publish creates a separate artifact instead of updating the existing one. Omit for new artifacts and same-conversation redeploys. Must be an artifact the user owns. For 'read' and the other url-addressed actions: the artifact to act on.
