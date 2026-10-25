<!--
name: 'Tool Result: Screen Takeover Declined by User'
description: Informs that the user declined full-screen screen takeover consent.
ccVersion: 2.1.310
-->
The user declined to let this session take over the screen. That's a separate consent from granting an app: approving an app for the background app_* tools does NOT approve a takeover, and request_access can't obtain it — the takeover card appears on its own the next time a display-scope tool is called. Stay with the app_* tools, or explain to the user why full-screen control is needed before trying again.
