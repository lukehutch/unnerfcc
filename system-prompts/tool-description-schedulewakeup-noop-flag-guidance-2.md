<!--
name: 'Tool Description: ScheduleWakeup noop-flag guidance'
description: >-
  Fallback-branch (n===-1) form of the noop:true/false guidance appended by
  Gda() to the full ScheduleWakeup/snooze loop-dynamic prompt; identical
  guidance to the split-site variant.
ccVersion: 2.1.199
variables:
  - TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_2_VAR_0
-->
${TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_2_VAR_0}
${'Set `noop: true` if nothing changed — you checked and there\'s nothing to report ("no change", "still waiting", "quiet hold"). Set `noop: false` if something happened worth keeping — you edited a file, posted a message, advanced state, or surfaced a finding. Consecutive `noop: true` ticks fold into one context entry, so a hundred quiet wakeups cost one turn instead of a hundred.'}
