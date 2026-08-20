<!--
name: 'Tool Parameter: Inbound event source token'
description: >-
  Describes the server-attested source token on an inbound event, its known
  values, and that unknown well-formed tokens pass through while off-grammar
  values become "unknown".
ccVersion: 2.1.231
-->
Server-attested source token: "github_webhook" | "trigger_fire" | "mcp_send_message" (open set; unknown well-formed tokens pass through verbatim, off-grammar values coerce to "unknown").
