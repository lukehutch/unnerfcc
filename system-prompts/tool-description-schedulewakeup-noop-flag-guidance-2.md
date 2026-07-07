<!--
name: 'Tool Description: ScheduleWakeup noop-flag guidance'
description: >-
  Fallback-branch (no insertion point found) form of the noop:true/false
  guidance appended to the full ScheduleWakeup/snooze loop-dynamic tool
  description; identical guidance to the split-site variant.
ccVersion: 2.1.202
variables:
  - BASE_TOOL_DESCRIPTION
-->
${BASE_TOOL_DESCRIPTION}
${'Set `noop: true` if nothing changed — you checked and there\'s nothing to report ("no change", "still waiting", "quiet hold"). Set `noop: false` if something happened worth keeping — you edited a file, posted a message, advanced state, or surfaced a finding. Consecutive `noop: true` ticks fold into one context entry, so a hundred quiet wakeups cost one turn instead of a hundred. Omit `noop` when stopping (`stop: true`).'}
