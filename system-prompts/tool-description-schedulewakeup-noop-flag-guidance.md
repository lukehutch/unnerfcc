<!--
name: 'Tool Description: ScheduleWakeup noop-flag guidance'
description: >-
  noop:true/false guidance spliced into the ScheduleWakeup/snooze loop-dynamic
  tool description at the '## Picking delaySeconds' insertion point; explains
  when to set noop and that consecutive noop ticks fold into one context entry.
ccVersion: 2.1.202
variables:
  - BASE_TOOL_DESCRIPTION
  - INSERTION_OFFSET
-->
${BASE_TOOL_DESCRIPTION.slice(0,INSERTION_OFFSET)}
${'Set `noop: true` if nothing changed — you checked and there\'s nothing to report ("no change", "still waiting", "quiet hold"). Set `noop: false` if something happened worth keeping — you edited a file, posted a message, advanced state, or surfaced a finding. Consecutive `noop: true` ticks fold into one context entry, so a hundred quiet wakeups cost one turn instead of a hundred. Omit `noop` when stopping (`stop: true`).'}
${BASE_TOOL_DESCRIPTION.slice(INSERTION_OFFSET)}
