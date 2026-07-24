<!--
name: Loop wake-up noop param (optional variant)
description: >-
  noop field of the /loop scheduled wake-up tool INPUT schema, instructing true
  for quiet no-change ticks (collapsed into a streak in the terminal view),
  false for real progress, and omission when stopping.
ccVersion: 2.1.217
-->
Set `noop: true` if nothing changed — you checked and there's nothing to report ("no change", "still waiting", "quiet hold"). Set `noop: false` if something happened worth keeping — you edited a file, posted a message, advanced state, or surfaced a finding. Consecutive `noop: true` ticks are collapsed in the user's terminal view and tracked as a streak, so long quiet holds stay legible to the user without scrolling. Omit `noop` when stopping (`stop: true`).
