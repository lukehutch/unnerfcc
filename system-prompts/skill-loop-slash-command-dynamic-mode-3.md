<!--
name: 'Skill: /loop slash command (dynamic mode)'
description: >-
  Parses user input into an interval and prompt for scheduling recurring or
  dynamically self-paced loop executions, and runs the parsed prompt immediately
ccVersion: 2.1.219
variables:
  - DYNAMIC_MODE_INSTRUCTIONS
  - USER_INPUT
-->

3. **Then immediately execute the parsed prompt now** — don't wait for the first cron fire. If it's a slash command, invoke it via the Skill tool; otherwise act on it directly.

## Dynamic mode (rule 3 — no interval)

${DYNAMIC_MODE_INSTRUCTIONS}

## Input

${USER_INPUT}
