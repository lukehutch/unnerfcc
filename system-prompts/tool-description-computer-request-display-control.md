<!--
name: 'Tool Description: Computer request_display_control'
description: >-
  Describes requesting user approval to take over full-screen control for the
  session.
ccVersion: 2.1.310
-->
Ask the user to approve full-screen control (screenshot, left_click, type, ...) for THIS SESSION. Use this when a background app_* action returned that taking over the screen needs approval. Once approved, the display-scope tools work for the rest of the session; you do not need to call this again. If the user prefers you stay in the background, they will decline.
