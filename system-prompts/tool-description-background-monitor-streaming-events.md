<!--
name: 'Tool Description: Background monitor (streaming events)'
description: >-
  Describes the background monitor tool that streams stdout events from
  long-running scripts as chat notifications, with guidelines on script quality,
  output volume, and selective filtering
ccVersion: 2.1.219
-->
Start a background monitor that streams events from a long-running script. Each stdout line is an event — you keep working and notifications arrive in the chat. Events arrive on their own schedule and are not replies from the user, even if one lands while you're waiting for the user to answer a question.

Pick by how many notifications you need:
