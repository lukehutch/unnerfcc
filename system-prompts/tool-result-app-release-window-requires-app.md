<!--
name: 'Tool Result: App Release Window Requires App'
description: >-
  Validates that releasing a specific window_id also requires specifying the app
  parameter.
ccVersion: 2.1.310
-->
`window_id` requires `app` — pass both to release one window, just `app` to release all of that app's windows, or neither to release everything.
