<!--
name: 'Tool Description: Artifact watch subscribing to live changes'
description: >-
  Explains background subscription to artifact live changes and republish
  notifications.
ccVersion: 2.1.257
-->
**Watching for republishes**: publishing an artifact starts subscribing this session to its live changes in the background, and the result line says whether that began, was skipped, or was already connected; you are told if it cannot connect, and watches reconnect on their own if the connection drops. A later republish from elsewhere — another session, or someone saving from a page that can publish new versions of itself — arrives as a notification telling you to re-read it before editing.
