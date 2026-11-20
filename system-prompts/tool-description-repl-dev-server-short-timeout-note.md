<!--
name: 'Tool Description: REPL dev server short timeout note'
description: >-
  Model-facing REPL note explaining how to move a dev server or watcher to the
  background using .timeout(3000) instead of nohup, setsid, or &.
ccVersion: 2.1.329
-->
 To keep a dev server or a watcher running, await it with a short timeout: `const server = await $`npm run dev`.timeout(3000)` moves it to the background after 3 s, where the user can see and stop it, and `server.running.outputPath` names the file with its output. Don't use `nohup`, `setsid` or `&` for this: Claude Code can't show or stop what they start.
