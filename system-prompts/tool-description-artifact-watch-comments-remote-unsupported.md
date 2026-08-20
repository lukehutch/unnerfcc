<!--
name: 'Tool Description: Watching for new comments (remote session)'
description: >-
  Remote-session branch of the Artifact tool description — new comments never
  arrive on their own, so read them with the comments action on request and
  suggest running claude --watch-artifact locally when the user expects live
  notice.
ccVersion: 2.1.235
-->
 Watching for new comments isn't supported yet from this remote session, so none reach it on their own: read them with `action: "comments"` when the user asks, and if the user expects you to notice comments as they arrive, say so plainly and suggest running `claude --watch-artifact <url>` in Claude Code on their own machine.
