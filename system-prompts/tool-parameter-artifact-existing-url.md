<!--
name: 'Tool Parameter: Artifact existing URL'
description: >-
  url field of the artifact publish tool — pass an existing artifact URL to
  update it in place instead of minting a new one.
ccVersion: 2.1.219
-->
Existing artifact URL to update in place. Pass whenever the user wants to update an artifact this conversation did not publish — "update my artifact", "keep the same link", a pasted artifact URL — and find the URL with action: "list" if you don't have it; without this, a conversation that didn't publish the artifact always mints a new URL. Omit for new artifacts and same-conversation redeploys. Must be an artifact the user owns.
