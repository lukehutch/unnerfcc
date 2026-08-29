<!--
name: 'Tool Description: open_application'
description: >-
  Description of the open_application computer-use tool (brings or launches an
  allowlisted app in background or display-scope mode).
ccVersion: 2.1.251
-->
Launch an application (or ensure it's running). In background app mode, the launch does NOT bring it to the front — the user's focus is preserved and the app becomes reachable via the app_* tools. In display-scope mode, the app is brought to the front. The target must already be in the session allowlist — call request_access first.
