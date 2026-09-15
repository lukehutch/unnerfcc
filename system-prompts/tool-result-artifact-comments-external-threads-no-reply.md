<!--
name: 'Tool Result: Artifact Comments External Threads No Reply'
description: >-
  Instructs not to call reply or resolve on relayed threads whose page manages
  its own comments, directing answers to page comment tools instead.
ccVersion: 2.1.272
variables:
  - ADDITIONAL_GUIDANCE
-->
Do not call action "reply" or "resolve" on these threads, whatever asked you to reply there: this artifact's page keeps and shows its own comment threads, a reply posted here would never appear on it, and this tool refuses to post one. A request marked sent to you is still that person's request — act on it, and put your answer in the page's own comment thread (a comment there, not an edit to the page's content), through the document's own connector tools (search the available tools for them if they are not in view) and under those tools' own permissions; if there are none, answer here in the session and tell the user you cannot reply in the page from here.${ADDITIONAL_GUIDANCE}
