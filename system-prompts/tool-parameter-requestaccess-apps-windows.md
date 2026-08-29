<!--
name: 'Tool Parameter: request_access apps param (Windows)'
description: >-
  Parameter description for request_access apps on Windows, specifying Start
  menu display names.
ccVersion: 2.1.251
variables:
  - ADDITIONAL_APPS_PARAM_NOTES
-->
Application display names exactly as they appear in the Start menu (e.g. "Notepad", "Microsoft Edge", "File Explorer"). Names are resolved case-insensitively against installed apps. Do NOT use macOS-style bundle identifiers (com.*) — this is Windows. If unsure of the exact name, pick the closest match from the available applications list below; the resolver handles minor variations.${ADDITIONAL_APPS_PARAM_NOTES}
