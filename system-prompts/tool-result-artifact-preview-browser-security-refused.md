<!--
name: 'Tool Result: Preview browser launch refused for security'
description: >-
  Refuses to launch a browser from writable locations to prevent executing
  planted binaries.
ccVersion: 2.1.272
-->
preview will not launch a browser this session's commands could have planted or altered: each one it found sits somewhere they can write without asking (a working directory, a temp dir, a sandbox write root, or a path a Write or Edit allow rule covers) — install Chrome outside those places, or point BUN_CHROME_PATH at one from your shell. Refused: 
