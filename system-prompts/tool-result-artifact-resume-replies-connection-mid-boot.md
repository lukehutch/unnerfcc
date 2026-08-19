<!--
name: 'Tool Result: Auto-replies not resumed — a reconnect is mid-boot'
description: >-
  Tells the model a connection for this artifact is already mid-boot so a resume
  cannot attach to it, and to check action "status" and the user's wishes before
  calling resume_replies again.
ccVersion: 2.1.235
-->
Auto-replies were NOT resumed: a connection for this artifact is already mid-boot (a reconnect in progress), and a resume cannot attach to it. The stop stays in place unless that connection is a fresh publish re-arming it — check action "status" first, and call resume_replies again only if it still reports stopped and the user still wants auto-replies resumed.
