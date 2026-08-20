<!--
name: 'Tool Parameter: Artifact acknowledge_duplicate'
description: >-
  Describes the Artifact tool's acknowledge_duplicate parameter — post a reply
  even though a Claude reply already stands on the thread, only for a deliberate
  follow-up that adds something new.
ccVersion: 2.1.235
-->
reply only: post even though a Claude reply already stands after every "sent to Claude" request on the thread. Without it such a reply is refused as a likely duplicate. Pass true only for a deliberate follow-up that adds something new — never to restate what the standing reply said.
