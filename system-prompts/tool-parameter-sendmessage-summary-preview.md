<!--
name: SendMessage summary preview param
description: >-
  inputSchema param of the SendMessage tool documenting the 5-10 word preview
  summary, its default from a plain-text message's first line, and that
  over-long summaries are truncated rather than rejected; model-facing.
ccVersion: 2.1.231
variables:
  - SUMMARY_MAX_CHARS
-->
A 5-10 word summary shown as a one-line preview in the UI. Defaults to the first line of a plain-text message; longer summaries are truncated to ${SUMMARY_MAX_CHARS} characters rather than rejected.
