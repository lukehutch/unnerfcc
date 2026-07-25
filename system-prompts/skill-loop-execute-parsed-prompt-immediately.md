<!--
name: 'Skill: /loop execute parsed prompt immediately'
description: >-
  Loop-skill step telling the model to run the parsed prompt now instead of
  waiting for the first cron fire, invoking slash commands via the Skill tool.
ccVersion: 2.1.219
variables:
  - LOOP_USER_INPUT
-->

3. **Then immediately execute the parsed prompt now** — don't wait for the first cron fire. If it's a slash command, invoke it via the Skill tool; otherwise act on it directly.

## Input

${LOOP_USER_INPUT}
