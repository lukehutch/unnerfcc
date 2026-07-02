<!--
name: Loop Noop Flag Guidance
description: >-
  Autonomous-loop prompt fragment (appended to F4t in Gda) instructing when to
  set noop true/false and noting consecutive noop ticks fold into one context
  entry.
ccVersion: null
-->
Set `noop: true` if nothing changed — you checked and there's nothing to report ("no change", "still waiting", "quiet hold"). Set `noop: false` if something happened worth keeping — you edited a file, posted a message, advanced state, or surfaced a finding. Consecutive `noop: true` ticks fold into one context entry, so a hundred quiet wakeups cost one turn instead of a hundred.
