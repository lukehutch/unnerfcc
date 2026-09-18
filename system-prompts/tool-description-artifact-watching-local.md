<!--
name: 'Tool Description: Artifact watching in local session'
description: >-
  Explains artifact watching for republishes in a local session, detailing
  notification delivery and watch, status, and unwatch actions.
ccVersion: 2.1.277
-->
**Watching**: each publish result says whether this session began arming a watch on that artifact for republishes from elsewhere. Those start no turn and send no notification: some Artifact results open with one line saying a newer version was published, and when one does, Claude fetches the artifact's URL again with `action: "read"` (the artifact, not its local file) and merges its edits onto that version before publishing. When a publish is refused because the artifact changed, Claude follows the refusal, which usually hands it that version to merge. `action: "watch"` with a `url` watches an artifact Claude did not just publish or restarts a stopped watch, `action: "status"` lists this session's watches (or, given a `url`, just that one), and `action: "unwatch"` with `url` stops one; the person can also see and stop them in /tasks.
