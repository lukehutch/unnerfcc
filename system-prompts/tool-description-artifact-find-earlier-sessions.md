<!--
name: 'Tool Description: Artifact find earlier sessions via list'
description: Instructs how to list and locate artifacts published in earlier sessions.
ccVersion: 2.1.257
-->
**To find artifacts from earlier sessions**: pass `action: "list"` (optionally with `limit` and `scope`) to enumerate the user's published artifacts — title, URL, favicon, and last-updated, newest first. Use it when the user refers to a published artifact whose URL you don't have, then follow the update flow above with the URL you found. Artifacts published earlier in THIS session need neither `action: "list"` nor `url` — calling again with the same file path redeploys them. 
