<!--
name: 'Tool Result: Claude in Chrome call not sent on stale check'
description: >-
  Model-facing tool result explaining that a Claude in Chrome call was not sent
  because it relied on an earlier page check and instructing to re-check tab
  context.
ccVersion: 2.1.329
-->
Claude in Chrome: this call was not sent. It was checked against the page that an earlier call of this reply saw, and it could not go ahead on that check alone. Call tabs_context_mcp to see where the tab is now, and decide afresh whether the call still fits that page.
