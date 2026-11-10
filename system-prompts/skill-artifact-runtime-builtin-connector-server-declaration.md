<!--
name: 'Skill: Built-in claude.ai connector server declaration'
description: >-
  Instructs declaring the exact connector name as server and notes
  session-dependent tools do not apply to viewers.
ccVersion: 2.1.321
-->
`: declare that exact name as `server` with those tools' upstream names. A published page calls them as the viewer, with no calling session, so tools that act on the calling session (e.g. `send_later`, `watch_url`) do not apply there. A viewer may have fewer of the connector's tools than you (often only a core set for managing routines), so keep each feature optional: only after the viewer has allowed the connector, have the page call `listTools()`. When a tool a feature needs is not listed, or a call to it rejects with code `blocked_by_policy`, show that feature as unavailable and do not call that tool.
