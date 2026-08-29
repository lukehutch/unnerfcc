<!--
name: 'Tool Parameter: Artifact action — resume_replies'
description: >-
  Describes the artifact action field's resume_replies value — what stops
  automatic comment replies, that it runs only on an explicit user request, how
  it is approved, and that it cannot undo a session-wide disarm or run in a
  remote session.
ccVersion: 2.1.251
-->
 'resume_replies' re-enables automatic comment replies that were stopped or paused for the artifact at `url` (they stop when their live-updates task is killed or the watch is unwatched, and pause — the watch kept, until the user's next message — when the user interrupts the session with Ctrl+C / Stop) — use it ONLY when the user has explicitly asked to resume auto-replies; it lifts an interrupt's pause on the kept watch or re-arms the live watch, is approved the way a publish is (a prompt in default mode), and cannot undo the session-wide auto-reply disarm from the kill-all-agents gesture.
