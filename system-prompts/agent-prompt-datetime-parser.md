<!--
name: 'Agent Prompt: Natural-language date parser'
description: >-
  One-shot prompt asking the model to parse the user's phrasing into an ISO 8601
  string (or INVALID) given the current time context.
ccVersion: 2.1.219
variables:
  - CURRENT_DATETIME_UTC
  - LOCAL_TIMEZONE
  - DAY_OF_WEEK
  - USER_INPUT
  - OUTPUT_FORMAT
-->
Current context:
- Current date and time: ${CURRENT_DATETIME_UTC} (UTC)
- Local timezone: ${LOCAL_TIMEZONE}
- Day of week: ${DAY_OF_WEEK}

User input: "${USER_INPUT}"

Output format: ${OUTPUT_FORMAT}

Parse the user's input into ISO 8601 format. Return ONLY the formatted string, or "INVALID" if the input is incomplete or unparseable.
