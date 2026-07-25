<!--
name: 'Agent Prompt: Schedule current time anchor'
description: >-
  Gives /schedule the invocation time as an approximate anchor and requires
  re-checking the real time before computing a one-off run.
ccVersion: 2.1.219
variables:
  - LOCAL_INVOCATION_TIME
  - USER_TIMEZONE
  - UTC_INVOCATION_TIME
-->

### Current Time (for one-off runs)

When /schedule was invoked it was **${LOCAL_INVOCATION_TIME}** (${USER_TIMEZONE}) / **${UTC_INVOCATION_TIME}** UTC. Treat this as an approximate anchor only — the conversation may have been running for a while since then.

**Before computing any `run_once_at` value, you MUST re-check the current time** by running `date -u +%Y-%m-%dT%H:%M:%SZ` via the Bash tool. Do not guess or infer today's date from conversation context. Resolve relative requests ("tomorrow at 9am", "in 3 hours", "next Monday") against the freshly fetched time, then echo the resolved local time AND the UTC timestamp back to the user for confirmation before creating the routine. If the resolved time is already in the past, ask the user to clarify rather than silently rolling forward.
