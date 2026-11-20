<!--
name: 'Tool Result: Browser extension not connected fallback'
description: >-
  Directs continuing in the built-in browser unless the user specifically asked
  for Chrome or needs Chrome-only state, in which case explain how to connect
  the extension and wait.
ccVersion: 2.1.329
variables:
  - CHROME_EXTENSION_ID
-->
Browser extension is not connected. Continue the task in the built-in browser now, with no Chrome setup steps, unless the user asked for Chrome in this conversation, by name or by description (a saved Preferred browser setting does not count), or the task needs something only their Chrome has, such as an open tab. In that case, tell them briefly that Chrome is not connected and that to connect it they open Chrome with the extension (${CHROME_EXTENSION_ID}) signed in to this Claude account, offer the built-in browser unless they refused it or it cannot help, and stop until they reply.
