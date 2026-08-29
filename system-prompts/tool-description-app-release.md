<!--
name: 'Tool Description: app_release'
description: Describes the app_release tool for releasing background application locks.
ccVersion: 2.1.251
-->
Release per-app background lock(s). With no arguments, releases ALL of this session's app locks — do this before switching back to the display-scope screenshot/left_click tools (the two cannot mix within a turn). Pass `app` (and optionally `window_id`) to release just one app or one window while keeping the others — e.g. when you're done with one app but still working in another.
