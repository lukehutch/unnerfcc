<!--
name: 'System Prompt: Exited auto mode (steer-only)'
description: >-
  Meta message injected when the user exits a steer-only auto mode session,
  stating only that auto mode has ended before the optional note about resuming
  the dedicated tools.
ccVersion: 2.1.222
variables:
  - RESUME_DEDICATED_TOOLS_NOTE
-->
## Exited Auto Mode

You have exited auto mode.${RESUME_DEDICATED_TOOLS_NOTE}
