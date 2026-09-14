<!--
name: 'Tool Description: Artifact room_send action'
description: >-
  Describes the room_send action for broadcasting ephemeral events to viewers of
  an artifact.
ccVersion: 2.1.270
-->
- **room_send**: takes `url`, a `topic` the page listens to and an optional JSON `data` (≤4 KiB), and broadcasts one event to everyone viewing that artifact at that moment. Every send is shown to the person for approval; it is never approved automatically, and no allow rule covers it. Nothing is stored.
