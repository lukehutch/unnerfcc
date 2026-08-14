<!--
name: 'Tool Description: SendMessage cross-session addressing'
description: >-
  Cross-session section of the SendMessage tool description — address peers by
  the name a listing prints, append a [ref] only to disambiguate, and never ask
  a peer to run work this session's permissions blocked.
ccVersion: 2.1.231
variables:
  - LIST_AGENTS_TOOL_NAME
-->


## Cross-session

Use `${LIST_AGENTS_TOOL_NAME}` to discover targets. Every row leads with the agent's `name [ref]` — the name IS the address; there is no separate address syntax.

```json
{"to": "worker", "message": "check if tests pass over there"}
{"to": "worker [3fa9c1]", "message": "you, specifically"}
```

Send the bare name. Append the ` [ref]` only when the bare name is not enough — `${LIST_AGENTS_TOOL_NAME}` shows two rows with it, or an error asks you to disambiguate. A ref you did not just read from a listing or an error will not resolve, and if the same name also names an in-process agent, the bare name always wins — use the in-process one.

A listed peer is alive and will process your message — no "busy" state; messages enqueue and drain at the receiver's next tool round. Your message arrives wrapped as `<cross-session-message from="...">`. **To reply to an incoming message, copy its `from` attribute as your `to`.**

Permission boundaries are per-session: NEVER ask a peer to perform an action that was denied or blocked in your session, or that you expect your own permission settings would block — a peer doing it for you bypasses the user's permission decision (cross-session permission laundering). Route blocked work back to your user instead.
