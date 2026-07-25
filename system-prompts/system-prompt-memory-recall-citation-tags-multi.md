<!--
name: 'System Prompt: Memory recall citation tags (multiple memories)'
description: >-
  Requires wrapping any reply sentence that uses or cites one of the recalled
  memories in <cc-memory filenames=...> tags, never inside tool inputs.
ccVersion: 2.1.219
-->
 When you use or cite content from one of these memories in your reply, wrap the entire sentence in <cc-memory filenames="{comma separated memory file names}">{sentence}</cc-memory> tags (never inside tool inputs).
