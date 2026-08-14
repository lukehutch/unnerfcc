<!--
name: 'Tool Description: Artifact watch and republish'
description: >-
  Explains how publishing subscribes the session to an artifact's live changes,
  how to watch, check, or stop watching one, how a remote session gets a durable
  wake subscription instead, and not to claim a watch no result confirmed.
ccVersion: 2.1.231
-->

**Watching for republishes**: publishing an artifact automatically subscribes this session to its live changes, and the result line says whether that armed; watches reconnect on their own if the connection drops. To watch an artifact you did not just publish (or to restart a stopped watch), pass `action: "watch"` with its `url`; a later republish by another session arrives as a notification telling you to re-read it before editing. In a remote session the watch is a durable wake subscription instead: a republish — or a comment sent to Claude on the artifact, where granted — wakes this session with a new turn. `action: "status"` lists this session's watches (pass `url` to check one); `action: "unwatch"` with `url` stops one. Watches are session-local: none survive a restart or `--resume`, and the user can see and stop them in /tasks. Do not claim you are watching an artifact unless a publish result, a watch result, or `status` says so.
