<!--
name: 'System Reminder: Cloud session rejected device proof'
description: >-
  Notification that device proof was rejected, causing commands to execute in
  cloud environment.
ccVersion: 2.1.257
variables:
  - REASON_OR_DETAILS
-->
The cloud session did not accept the device proof on this machine's requests, so commands meant for this machine are not routed here and the session uses its own environment instead — ${REASON_OR_DETAILS}.
