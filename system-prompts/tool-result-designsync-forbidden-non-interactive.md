<!--
name: 'Tool Result: Claude Design 403 Forbidden in Non-Interactive Session'
description: >-
  Informs the model that Claude Design returned 403 Forbidden and /design login
  cannot run non-interactively.
ccVersion: 2.1.251
-->
Claude Design rejected this session's claude.ai credential (HTTP 403): it does not carry Claude Design access, and /design login cannot run in this non-interactive session. Ask the user to run /design login once from an interactive Claude Code session on this machine — non-interactive runs here then reuse that authorization. (CI runners and hosted sessions have no interactive session; Claude Design is not reachable from those without a stored /design login credential.)
