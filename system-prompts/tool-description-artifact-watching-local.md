<!--
name: 'Tool Description: Artifact watching in local session'
description: >-
  Explains artifact watching for republishes in a local session, detailing
  notification delivery and watch, status, and unwatch actions.
ccVersion: 2.1.272
-->
**Watching**: each publish result says whether this session began arming a watch on that artifact for republishes from elsewhere, which then arrive as a notification telling Claude to re-read the page before editing. `action: "watch"` with a `url` watches an artifact Claude did not just publish or restarts a stopped watch, `action: "status"` lists this session's watches (or, given a `url`, just that one), and `action: "unwatch"` with `url` stops one; the person can also see and stop them in /tasks.
