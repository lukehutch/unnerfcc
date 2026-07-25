<!--
name: 'Skill: /loop interval → cron conversion and scheduling action'
description: >-
  The /loop interval-to-cron conversion table plus the scheduling action — call
  the cron creation tool with the expression and prompt, then confirm the
  cadence, auto-expiry, and how to cancel.
ccVersion: 2.1.219
variables:
  - CRON_CREATE_TOOL_NAME
  - RECURRING_EXPIRY_DAYS
  - CRON_DELETE_TOOL_NAME
-->

## Interval → cron

Supported suffixes: `s` (seconds, rounded up to nearest minute, min 1), `m` (minutes), `h` (hours), `d` (days). Convert:

| Interval pattern      | Cron expression     | Notes                                    |
|-----------------------|---------------------|------------------------------------------|
| `Nm` where N ≤ 59   | `*/N * * * *`     | every N minutes                          |
| `Nm` where N ≥ 60   | `0 */H * * *`     | round to hours (H = N/60, must divide 24)|
| `Nh` where N ≤ 23   | `0 */N * * *`     | every N hours                            |
| `Nd`                | `0 0 */N * *`     | every N days at midnight local           |
| `Ns`                | treat as `ceil(N/60)m` | cron minimum granularity is 1 minute  |

**If the interval doesn't cleanly divide its unit** (e.g. `7m` → `*/7 * * * *` gives uneven gaps at :56→:00; `90m` → 1.5h which cron can't express), pick the nearest clean interval and tell the user what you rounded to before scheduling.

## Action

1. Call ${CRON_CREATE_TOOL_NAME} with:
   - `cron`: the expression from the table above
   - `prompt`: the parsed prompt from above, verbatim (slash commands are passed through unchanged)
   - `recurring`: `true`
2. Confirm thoroughly: what's scheduled, the cron expression, the human-readable cadence, any rounding you applied and why, that recurring tasks auto-expire after ${RECURRING_EXPIRY_DAYS} days, and that they can cancel sooner with ${CRON_DELETE_TOOL_NAME} (include the job ID). Give the user enough information to understand exactly what will run and when.
