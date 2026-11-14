<!--
name: 'System Reminder: Subagent started in session folder'
description: >-
  Notes that a subagent started in the session's folder rather than the shell's
  current directory and explains how /cd moves the session folder.
ccVersion: 2.1.325
-->

It started in the session's own folder, not in the folder the shell has moved to, so that folder's settings and permission rules do not apply to it. Send it the path to work in, and tell the user that /cd moves the session's folder.
