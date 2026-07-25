<!--
name: 'Skill: /schedule one-time run UTC conversion'
description: >-
  Applies the same local-to-UTC conversion to one-time runs, mapping a request
  like "run this at 3pm" to a run_once_at timestamp in UTC.
ccVersion: 2.1.219
-->
 For one-time runs, the same conversion applies — "run this at 3pm" → `"run_once_at": "YYYY-MM-DDTHH:00:00Z"` with their 3pm converted to UTC.
