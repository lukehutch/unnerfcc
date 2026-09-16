<!--
name: 'System Reminder: Artifact connector unverified'
description: >-
  Warns that the page being published declares a connector whose calls were
  never observed this session, and to verify them or disclose the gap to the
  user.
ccVersion: 2.1.273
variables:
  - CONNECTOR_NAME
-->
 "${CONNECTOR_NAME}" but no successful call to it was observed in this session, so the page is published against an unobserved interface. Check the page's argument names against each tool's input schema if this session has the tool. The result fields the page reads stay unverified unless you can safely make one real call; otherwise tell the user the page's "${CONNECTOR_NAME}" integration is unverified.
