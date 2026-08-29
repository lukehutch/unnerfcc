<!--
name: 'Tool Description: request_full_control'
description: >-
  Describes the request_full_control tool for asking user approval for
  display-scope full-screen control.
ccVersion: 2.1.251
-->
Ask the user to approve full-screen control (screenshot, left_click, type, ...) for THIS SESSION. Use this when a background app_* action returned that taking over the screen needs approval. Once approved, the display-scope tools work for the rest of the session; you do not need to call this again. If the user prefers you stay in the background, they will decline.
