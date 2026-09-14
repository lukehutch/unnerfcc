<!--
name: 'Tool Parameter: Computer Windows application display names'
description: >-
  Specifies Windows Start menu application display names for permission
  requests.
ccVersion: 2.1.270
variables:
  - EXTRA_GUIDANCE
-->
Application display names exactly as they appear in the Start menu (e.g. "Notepad", "Microsoft Edge", "File Explorer"). Names are resolved case-insensitively against installed apps. Do NOT use macOS-style bundle identifiers (com.*) — this is Windows. If unsure of the exact name, pick the closest match from the available applications list below; the resolver handles minor variations.${EXTRA_GUIDANCE}
