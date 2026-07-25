<!--
name: 'Skill: Schedule recurring cron and run immediately'
description: >-
  Converts an interval to a cron expression, schedules a recurring task via the
  cron creation tool, confirms to the user, and immediately executes the task
  without waiting for the first cron fire
ccVersion: 2.1.219
variables:
  - CONTEXT_HEADER
  - SCHEDULE_INTERVAL
  - CRON_CREATE_TOOL_NAME
  - TASK_PROMPT
  - TASK_PROMPT_EXPLANATION
  - CONFIRMATION_TEXT
  - TASK_NAME
  - TASK_INSTRUCTIONS
  - TRAILING_NOTE
-->
${CONTEXT_HEADER}

## Action

1. Convert `${SCHEDULE_INTERVAL}` to a 5-field cron expression. Supported suffixes: `s` → ceil to nearest minute, `m` (minutes), `h` (hours), `d` (days). Examples: `5m` → `*/5 * * * *`, `1h` → `0 * * * *`, `1d` → `0 0 * * *`. If the interval doesn't cleanly divide its unit, round to the nearest clean interval and tell the user what you rounded to.
2. Call ${CRON_CREATE_TOOL_NAME} with:
   - `cron`: the expression from step 1
   - `prompt`: the literal string `${TASK_PROMPT}` — ${TASK_PROMPT_EXPLANATION}
   - `recurring`: `true`
3. Confirm thoroughly: ${CONFIRMATION_TEXT} Cover the cadence, any rounding applied, and what to expect so the user understands exactly what's scheduled.
4. **Then immediately run ${TASK_NAME} now**, following the instructions inlined below. Don't wait for the first cron fire.

${TASK_INSTRUCTIONS}

${TRAILING_NOTE}
