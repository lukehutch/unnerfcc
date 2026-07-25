<!--
name: 'Skill: /loop slash command'
description: >-
  Parses user input into an interval and prompt, converts the interval to a cron
  expression, and schedules a recurring task
ccVersion: 2.1.219
variables:
  - CRON_CREATE_TOOL_NAME
  - DEFAULT_INTERVAL
-->
# /loop — schedule a recurring prompt

Parse the input below into `[interval] <prompt…>` and schedule it with ${CRON_CREATE_TOOL_NAME}.

## Parsing (in priority order)

1. **Leading token**: if the first whitespace-delimited token matches `^\d+[smhd]$` (e.g. `5m`, `2h`), that's the interval; the rest is the prompt.
2. **Trailing "every" clause**: otherwise, if the input ends with `every <N><unit>` or `every <N> <unit-word>` (e.g. `every 20m`, `every 5 minutes`, `every 2 hours`), extract that as the interval and strip it from the prompt. Only match when what follows "every" is a time expression — `check every PR` has no interval.
3. **Default**: otherwise, interval is `${DEFAULT_INTERVAL}` and the entire input is the prompt.

If the resulting prompt is empty, show usage `/loop [interval] <prompt>` and stop — do not call ${CRON_CREATE_TOOL_NAME}.

Examples:
- `5m /babysit-prs` → interval `5m`, prompt `/babysit-prs` (rule 1)
- `check the deploy every 20m` → interval `20m`, prompt `check the deploy` (rule 2)
- `run tests every 5 minutes` → interval `5m`, prompt `run tests` (rule 2)
- `check the deploy` → interval `${DEFAULT_INTERVAL}`, prompt `check the deploy` (rule 3)
- `check every PR` → interval `${DEFAULT_INTERVAL}`, prompt `check every PR` (rule 3 — "every" not followed by time)
- `5m` → empty prompt → show usage
