<!--
name: 'System Reminder: Artifact connector unverified'
description: >-
  Warns that the page being published declares a connector whose calls were
  never observed this session, and to verify them or disclose the gap to the
  user.
ccVersion: 2.1.251
variables:
  - CONNECTOR_NAME
-->
 "${CONNECTOR_NAME}" but no successful call to it was observed in this session, so the page is published against an unobserved interface. Verify its calls against a real response if you can safely make one, or tell the user the page's "${CONNECTOR_NAME}" integration is unverified.
