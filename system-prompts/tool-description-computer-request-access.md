<!--
name: 'Tool Description: Computer request_access tool'
description: >-
  Explains requesting session permissions to control specific applications
  before using other computer tools.
ccVersion: 2.1.270
-->
Request user permission to control a set of applications for this session. Must be called before any other tool in this server. The user sees a single dialog listing all requested apps and either allows the whole set or denies it. Call this again mid-session to add more apps; previously granted apps remain granted. Returns the granted apps, denied apps, and screenshot filtering capability. This does NOT grant permission to take over the screen — that consent has its own separate card, raised automatically the first time a display-scope tool runs after background work; do not call request_access to obtain it.
