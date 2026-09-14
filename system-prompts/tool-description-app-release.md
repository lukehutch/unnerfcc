<!--
name: 'Tool Description: App release'
description: Describes releasing per-app background locks using app_release.
ccVersion: 2.1.270
-->
Release per-app background lock(s). With no arguments, releases ALL of this session's app locks — do this before switching back to the display-scope screenshot/left_click tools (the two cannot mix within a turn). Pass `app` (and optionally `window_id`) to release just one app or one window while keeping the others — e.g. when you're done with one app but still working in another.
