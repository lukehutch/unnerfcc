<!--
name: 'Tool Parameter: Computer request_access applications (Windows)'
description: >-
  Describes the applications list parameter for request_access on Windows using
  Start menu names.
ccVersion: 2.1.310
variables:
  - AVAILABLE_APPS_LIST
-->
Application display names exactly as they appear in the Start menu (e.g. "Notepad", "Microsoft Edge", "File Explorer"). Names are resolved case-insensitively against installed apps. Do NOT use macOS-style bundle identifiers (com.*) — this is Windows. If unsure of the exact name, pick the closest match from the available applications list below; the resolver handles minor variations.${AVAILABLE_APPS_LIST}
