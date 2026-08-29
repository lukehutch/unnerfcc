<!--
name: 'Tool Result: Artifact auto-replies paused by user interrupt status'
description: >-
  Details the paused status of auto-replies following a user interrupt and how
  they can be resumed.
ccVersion: 2.1.251
-->
auto-replies paused by the user's interrupt (Ctrl+C or Stop) — the user's next message resumes them, as does a publish of this artifact the user asks for or an asked-for resume (publishing it without being asked, while handling a notification or a wake-up, leaves them paused); comments sent to Claude meanwhile are answered then; no comment notifications arrive until then (do not republish or resume just to re-enable them)
