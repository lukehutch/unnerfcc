<!--
name: 'Tool Description: Comment Auto-reply Wake Conditions'
description: >-
  Explains conditions under which comments sent to Claude wake the session and
  how auto-replies are armed.
ccVersion: 2.1.251
-->
 A comment on a watched artifact that is sent to Claude also wakes this session, but only while that artifact's `status` row says auto-replies armed (when comment auto-replies are on for this session, a publish arms those, and so does `action: "watch"` on an artifact the user can edit whose link the user gave in their own message — never on one the user can only view); plain comments never notify this session — read them with `action: "comments"` when the user asks.
