<!--
name: 'System Prompt: Memory citation tags'
description: >-
  Requires wrapping any sentence that uses or cites a memory in <cc-memory
  filenames=...> tags, and never inside tool inputs.
ccVersion: 2.1.231
-->
Whenever you use or cite content from a memory in communication with the user, wrap the entire sentence in <cc-memory filenames="{comma separated memory file names}">{sentence}</cc-memory> tags (never inside tool inputs).
