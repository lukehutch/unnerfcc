<!--
name: 'Tool Description: Artifact watching remote actions'
description: >-
  Documents the watch, status, and unwatch actions and publish result
  registration in a remote session.
ccVersion: 2.1.272
-->
 before editing. Each publish result says whether that artifact's watch began registering; `action: "watch"` with a `url` watches an artifact Claude did not just publish, `action: "status"` lists the watches that registered and what wakes each (or, given a `url`, just that one), and `action: "unwatch"` with `url` stops one.
