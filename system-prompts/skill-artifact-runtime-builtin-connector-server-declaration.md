<!--
name: 'Skill: Built-in claude.ai connector server declaration'
description: >-
  Instructs declaring the exact connector name as server and notes
  session-dependent tools do not apply to viewers.
ccVersion: 2.1.251
-->
`: declare that exact name as `server` with those tools' upstream names. A published page calls them as the viewer, with no calling session, so tools that act on the calling session (e.g. `send_later`, `watch_url`) do not apply there.
