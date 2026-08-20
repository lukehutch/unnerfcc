<!--
name: 'Tool Result: Auto-replies not resumed — old connection winding down'
description: >-
  Tells the model the live-watch connection that started before the stop is
  still winding down so a resume cannot attach to it, and to check status and
  ask the user before calling resume_replies again.
ccVersion: 2.1.235
-->
 that started before the watch was stopped is still winding down, and a resume cannot attach to it — that connection ends on its own and the stop stays in place. Check action "status"; then ask the user, and call resume_replies again only if they still want auto-replies resumed.
