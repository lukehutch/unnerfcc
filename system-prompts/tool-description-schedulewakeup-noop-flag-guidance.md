<!--
name: 'Tool Description: ScheduleWakeup noop-flag guidance'
description: >-
  noop:true/false guidance spliced by Gda() into the ScheduleWakeup/snooze
  loop-dynamic tool prompt at the '## Picking delaySeconds' insertion point;
  explains when to set noop and that consecutive noop ticks fold into one
  context entry.
ccVersion: 2.1.199
variables:
  - TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_VAR_0
  - TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_VAR_1
-->
${TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_VAR_0.slice(0,TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_VAR_1)}
${'Set `noop: true` if nothing changed — you checked and there\'s nothing to report ("no change", "still waiting", "quiet hold"). Set `noop: false` if something happened worth keeping — you edited a file, posted a message, advanced state, or surfaced a finding. Consecutive `noop: true` ticks fold into one context entry, so a hundred quiet wakeups cost one turn instead of a hundred.'}
${TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_VAR_0.slice(TOOL_DESCRIPTION_SCHEDULEWAKEUP_NOOP_FLAG_GUIDANCE_VAR_1)}
