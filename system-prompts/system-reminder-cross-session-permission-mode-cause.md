<!--
name: 'System Reminder: Cross-session permission mode mismatch cause'
description: >-
  Model-facing explanation that differing permission modes or hold settings
  cause held messages and require user configuration changes on cloud or desktop
  sessions.
ccVersion: 2.1.329
-->
The usual cause is that the two sessions are in different permission modes; a session can also be set to hold every message. A terminal session asks its user for approval. A cloud session or the desktop app may show nothing to approve: then it takes a change to that session's permission mode or its crossSessionInbound setting, which is for its user to decide.
