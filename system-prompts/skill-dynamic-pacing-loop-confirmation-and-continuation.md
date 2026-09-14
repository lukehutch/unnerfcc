<!--
name: 'Skill: Dynamic pacing loop confirmation and continuation'
description: >-
  Steps 3 to 6 for dynamic pacing loop execution covering confirmation,
  re-arming schedule_wakeup, handling events, and stopping.
ccVersion: 2.1.270
variables:
  - CONFIRMATION_TOPIC
  - MONITOR_TOOL_NAME
  - SCHEDULE_WAKEUP_TOOL_NAME
  - SENTINEL_STRING
  - TASK_STOP_TOOL_NAME
  - TASK_LIST_TOOL_NAME
-->

3. **Confirm thoroughly**: ${CONFIRMATION_TOPIC}, whether a ${MONITOR_TOOL_NAME} is the primary wake signal, the fallback delay you're about to pick and the reasoning that drove the choice, and any observations from this turn that should inform future iterations. Write this as text *before* calling ${SCHEDULE_WAKEUP_TOOL_NAME} — the turn ends as soon as that tool returns.
4. **Then, as the last action of this turn, decide whether the loop continues.** If the next check is worth running, call ${SCHEDULE_WAKEUP_TOOL_NAME} with:
   - `delaySeconds`: with a ${MONITOR_TOOL_NAME} armed this is the fallback heartbeat (lean 1200–1800s). Without one, pick based on what you observed this turn — quiet branch? wait longer. Lots in flight? wait shorter. Read the tool's own description for cache-aware delay guidance.
   - `reason`: one short sentence on why you picked that delay.
   - `prompt`: the literal string `${SENTINEL_STRING}` — the dynamic-mode sentinel expands at fire time to the full instructions (first fire / first fire post-compact / loop.md edited) or a dynamic-pacing-specific short reminder (subsequent fires). Do not pass the full instructions; that is handled automatically.
   - `noop`: `true` if this tick changed nothing ("still waiting", "quiet hold"); `false` if it did something worth keeping. Consecutive `noop: true` ticks collapse in the terminal.
   If it isn't, stop instead (step 6) — re-arming is a per-turn choice, not a default.
5. **If woken by a `<task-notification>`** rather than this prompt: handle the event, then make the same decision. If the loop should continue, call ${SCHEDULE_WAKEUP_TOOL_NAME} again with `${SENTINEL_STRING}` and the same 1200–1800s `delaySeconds` (the ${MONITOR_TOOL_NAME} remains the wake signal; the new wakeup is only the fallback heartbeat). If the event means the work is finished, stop (step 6).
6. **To stop the loop** — the task is complete, further iterations can't make progress, or the user asked you to stop — call ${SCHEDULE_WAKEUP_TOOL_NAME} with `stop: true` (no other fields) and ${TASK_STOP_TOOL_NAME} any ${MONITOR_TOOL_NAME} you armed (use ${TASK_LIST_TOOL_NAME} to find the task ID if it is no longer in context). Stopping is the loop's normal ending — the user can restart it anytime with /loop.
