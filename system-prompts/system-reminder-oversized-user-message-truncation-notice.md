<!--
name: 'System Reminder: Oversized user message truncation notice'
description: >-
  Informs the model that only the ends of an oversized user message are visible,
  forbids guessing the middle, and advises asking the user to resend as a file
  or smaller parts.
ccVersion: 2.1.329
variables:
  - EDGE_CHAR_COUNT
  - OMITTED_CHAR_COUNT
-->
 characters) were too long to be accepted, and the user saw an error. Only its first and last ${EDGE_CHAR_COUNT} characters follow, so that you can see what it was and any question or file names at its ends. The ${OMITTED_CHAR_COUNT} characters between them are missing: do not guess what they said, and do not treat the two pieces as the whole. Unless you have already done so, tell the user that you can now see only the two ends of that message, and that they can send it as a file or in smaller parts.
