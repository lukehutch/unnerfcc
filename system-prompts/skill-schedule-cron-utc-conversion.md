<!--
name: 'Skill: /schedule cron UTC conversion'
description: >-
  Requires cron times to be UTC and instructs the model to convert a user's
  local time and confirm the conversion back to them explicitly.
ccVersion: 2.1.219
variables:
  - USER_TIMEZONE
-->
 are always in UTC. When the user says a local time, convert it to UTC but confirm with them: "9am ${USER_TIMEZONE} = Xam UTC, so the cron would be `0 X * * 1-5`."
