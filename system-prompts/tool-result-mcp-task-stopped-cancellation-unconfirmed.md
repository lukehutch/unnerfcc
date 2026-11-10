<!--
name: 'Tool Result: MCP task stopped cancellation unconfirmed'
description: >-
  Notes that an MCP task was stopped fire-and-forget without server
  confirmation, advising checking only if the user asks.
ccVersion: 2.1.321
-->
) is stopped. Cancellations are fire and forget, so there is no confirmation from the MCP server, and it may already have done some of the work. Only check on it if the user asks.
