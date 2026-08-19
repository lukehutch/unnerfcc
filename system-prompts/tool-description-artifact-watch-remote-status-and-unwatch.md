<!--
name: 'Tool Description: Watch status and unwatch (remote session)'
description: >-
  Tail of the remote-session watch note — the watch action only reports the gap,
  the user can run `claude --watch-artifact` on their own machine, status and
  unwatch inspect or stop this session's watches, and the model must not claim
  it is watching an artifact.
ccVersion: 2.1.235
-->
, and `action: "watch"` only reports that. If the user asks you to watch an artifact, say so plainly and suggest running `claude --watch-artifact <url>` in Claude Code on their own machine. `action: "status"` lists this session's watches (pass `url` to check one); `action: "unwatch"` with `url` stops one. Do not claim you are watching an artifact.
