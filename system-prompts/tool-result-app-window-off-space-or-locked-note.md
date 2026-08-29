<!--
name: 'Tool Result: Window off-Space or locked notice'
description: >-
  Notice attached to app_screenshot when the target window is on another Space
  or screen is locked.
ccVersion: 2.1.251
variables:
  - ACTION_ADVICE
-->
Note: this window is on another Space, or the screen is locked — these look the same from here. If it's just off-Space: for most apps this frame is current and you can still click/type into it in the background; for apps that only accept input when brought to the front (which would flash on-screen), the frame may be STALE and actions will be refused. If the screen is locked, actions are refused until it's unlocked. When an action here refuses because the window is off-Space, ${ACTION_ADVICE}.

