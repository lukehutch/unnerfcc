<!--
name: 'Tool Result: Plan approval payload size limit exceeded'
description: >-
  Informs the model that the submitted plan exceeds approval card byte limits
  and instructs shortening it.
ccVersion: 2.1.310
variables:
  - PLAN_BYTE_SIZE
  - MAX_BYTE_SIZE
-->
The plan is ${PLAN_BYTE_SIZE} bytes as JSON, over the ${MAX_BYTE_SIZE} that the user's approval card can carry. A quote, backslash or line break counts as two bytes, and a non-ASCII character as two to four. Shorten the plan and call this tool again.
