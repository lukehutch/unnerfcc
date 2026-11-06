<!--
name: 'Tool Result: Attachment reference invalid filename characters'
description: >-
  Rejects attachment filenames with prohibited characters, invalid unicode, or
  excessive length.
ccVersion: 2.1.318
variables:
  - ERROR_DETAIL
-->
 holds a line break, a control character, an invisible or direction-changing character (such as a zero-width space or U+202E), a private-use character, U+FFFD, more than four combining marks on one character or more than four stacking signs (such as Khmer's coeng) in one stack of letters, a double quote ("), a backslash, a slash, a semicolon, "=?" or a percent escape such as %2F, has no letter or digit, or is longer than 120 characters, ${ERROR_DETAIL} Make the call again with a name of at most 120 characters on one line, without those characters and with at least one letter or digit (for "=?", a space between "=" and "?" is enough).
