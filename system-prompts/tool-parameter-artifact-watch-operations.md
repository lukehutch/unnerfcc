<!--
name: 'Tool Parameter: Artifact watch operations'
description: >-
  Describes the artifact tool's watch/unwatch/status operations for
  session-scoped live-update subscriptions to a published page.
ccVersion: 2.1.219
-->
 'watch' opens a live-update subscription to the artifact at `url` so this session is notified when another session republishes it; 'unwatch' stops that subscription; 'status' lists this session's artifact watches (pass `url` to check one). Watches live only as long as this session.
