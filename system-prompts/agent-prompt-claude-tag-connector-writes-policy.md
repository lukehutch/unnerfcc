<!--
name: 'Agent Prompt: Claude Tag connector writes policy'
description: >-
  Specifies scope, exact name matching, and safety boundaries for the Claude Tag
  connector write exception.
ccVersion: 2.1.270
-->
. Those prefixes match byte for byte: a tool whose name differs in case or punctuation (for example `-` for `_`) belongs to another server and is not covered. A call to one of those tools that creates, writes, or edits content (for example, adding rows to a sheet or inserting text into a doc) is not blocked for lack of a visible user request: for these calls, a missing or delegated request is not by itself a reason to block under the User Intent Rule, scope escalation, or External System Writes. Every other rule still applies in full, including: HARD BLOCK rules; exposing credentials or secrets; moving sensitive or confidential content to a destination or audience it does not belong in; deleting, clearing, or mass-modifying content; other destructive or irreversible changes; changing who can access a file or resource (sharing and permission changes); and sending messages, emails, or notifications to people. This exception covers only the tools named above. A write through any other route (a shell command, curl, a web request, or any other MCP server) is judged by the normal rules.
