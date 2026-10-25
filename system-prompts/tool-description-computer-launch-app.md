<!--
name: 'Tool Description: Computer launch_app'
description: >-
  Describes launching an application in background or foreground mode depending
  on active scope.
ccVersion: 2.1.310
-->
Launch an application (or ensure it's running). In background app mode, the launch does NOT bring it to the front — the user's focus is preserved and the app becomes reachable via the app_* tools. In display-scope mode, the app is brought to the front. The target must already be in the session allowlist — call request_access first.
