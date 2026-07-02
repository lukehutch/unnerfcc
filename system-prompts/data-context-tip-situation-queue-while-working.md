<!--
name: 'Data: Context Tip Situation — Queue While Working'
description: >-
  Situation text for detecting when the user waited out a long turn before
  sending a correction/addition, to surface the queue-while-working tip
ccVersion: 2.1.191
-->
After a long assistant turn with many tool calls, the user's next message is a correction or addition that did not depend on the final result — "actually, also do X", "wait, I meant Y", "oh and run Z too", "no, use the other file". They waited for Claude to finish before sending something they could have sent mid-turn. IMPORTANT: Do NOT match when the user's message clearly reacts to the final output (e.g. "that looks good" or a question about the result) — that is normal turn-taking.
