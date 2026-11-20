<!--
name: 'Tool Result: Browser tool invalid characters or length'
description: >-
  Model-facing error rejecting a browser tool call due to disallowed characters
  or oversized values and advising how to sanitize path or origin before
  retrying.
ccVersion: 2.1.329
-->
Nothing was saved or uploaded. A value has "=" or a sign like it, or the values are too long. If it is a path, copy the file to a short path without that sign. If it is origin, send the site alone, with no path or query. Then call the tool again. If neither helps, tell the user, and do not retry.
