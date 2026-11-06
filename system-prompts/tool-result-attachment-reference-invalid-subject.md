<!--
name: 'Tool Result: Attachment reference invalid subject characters'
description: >-
  Rejects email subject strings containing line breaks, control characters, or
  invalid unicode formatting.
ccVersion: 2.1.318
variables:
  - CALL_IDENTIFIER
  - SERVICE_NAME
-->
${CALL_IDENTIFIER}'s "subject" holds a line break, a control character, an invisible or direction-changing character (such as a zero-width space or U+202E), a private-use character, U+FFFD, more than four combining marks on one character or more than four stacking signs (such as Khmer's coeng) in one stack of letters, or "=?", or is longer than 250 characters, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again with a subject of at most 250 characters on one line, without those characters (for "=?", a space between "=" and "?" is enough).
