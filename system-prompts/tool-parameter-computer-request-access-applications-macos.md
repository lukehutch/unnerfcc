<!--
name: 'Tool Parameter: Computer request_access applications (macOS)'
description: >-
  Describes the applications list parameter for request_access on macOS using
  display names or bundle IDs.
ccVersion: 2.1.310
variables:
  - AVAILABLE_APPS_LIST
-->
Application display names (e.g. "Slack", "Calendar") or bundle identifiers (e.g. "com.tinyspeck.slackmacgap"). Display names are resolved case-insensitively against installed apps.${AVAILABLE_APPS_LIST}
