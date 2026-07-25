<!--
name: 'Skill: Code Review (findings fixed later)'
description: >-
  Requires re-reporting findings through the findings tool as soon as they are
  fixed later in the session, before any prose summary.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_FIX_CALL_INSTRUCTION
-->


## If findings are fixed later

Whenever reported findings get fixed later in this session - the user asks you
to fix them, or later work fixes them incidentally - you MUST ${REPORT_FINDINGS_FIX_CALL_INSTRUCTION}.
Make that call immediately after the fixes land, before any prose summary; the
host UI's per-finding status updates only from it, and without it the findings
stay marked unresolved.
