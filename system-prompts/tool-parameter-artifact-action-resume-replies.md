<!--
name: 'Tool Parameter: Artifact action — resume_replies'
description: >-
  Describes the artifact action field's resume_replies value — what stops
  automatic comment replies, that it runs only on an explicit user request, how
  it is approved, and that it cannot undo a session-wide disarm or run in a
  remote session.
ccVersion: 2.1.235
-->
 'resume_replies' re-enables automatic comment replies that were stopped for the artifact at `url` (they stop when their live-updates task is killed, when the watch is unwatched, or when the user interrupts the session with Ctrl+C / Stop) — use it ONLY when the user has explicitly asked to resume auto-replies; it re-arms the live watch, is approved the way a publish is (a prompt in default mode), and cannot undo the session-wide auto-reply disarm from the kill-all-agents gesture; in a remote session it is unavailable (no live watch to re-arm — comment wakes come through 'watch'), so there say so rather than calling it.
