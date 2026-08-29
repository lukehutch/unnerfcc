<!--
name: 'Tool Parameter: resume_replies unavailable in remote session (durable wake)'
description: >-
  Explains that resume_replies is unavailable in remote sessions where comment
  wakes come through durable watch subscriptions.
ccVersion: 2.1.251
-->
 'resume_replies' (re-enabling automatic comment replies the user stopped) is unavailable in this remote session — there is no live watch to re-arm, and comment wakes come through 'watch' — so say so rather than calling it.
