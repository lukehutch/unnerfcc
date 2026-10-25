<!--
name: 'Tool Result: App Window Off-Space or Locked Note'
description: >-
  Notes that a window is on another Space or screen is locked, and explains
  behavior and recovery.
ccVersion: 2.1.310
variables:
  - RECOVERY_ACTION
-->
Note: this window is on another Space, or the screen is locked — these look the same from here. If it's just off-Space: for most apps this frame is current and you can still click/type into it in the background; for apps that only accept input when brought to the front (which would flash on-screen), the frame may be STALE and actions will be refused. If the screen is locked, actions are refused until it's unlocked. When an action here refuses because the window is off-Space, ${RECOVERY_ACTION}.

