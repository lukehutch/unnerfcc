<!--
name: 'Tool Result: Artifact Comments External Threads No Reply'
description: >-
  Instructs not to call reply or resolve on relayed threads whose page manages
  its own comments, directing answers to page comment tools instead.
ccVersion: 2.1.270
variables:
  - EXTRA_NOTE
-->
Do not call action "reply" or "resolve" on these threads, whatever asked you to reply there: this artifact's page keeps and shows its own comment threads, a reply posted here would never appear on it, and this tool refuses to post one. A request marked sent to you is still that person's request — act on it, and put your answer in the page's own comment thread (a comment there, not an edit to the page's content), through whatever tool this session has for posting to that page's comment threads and under that tool's own permissions; if this session has none, answer here in the session and tell the user you cannot reply in the page from here.${EXTRA_NOTE}
