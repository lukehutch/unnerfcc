<!--
name: SendMessage summary preview param
description: >-
  inputSchema param of the SendMessage tool documenting the 5-10 word preview
  summary and that over-long summaries are truncated rather than rejected;
  model-facing.
ccVersion: 2.1.222
variables:
  - SUMMARY_MAX_CHARS
-->
A 5-10 word summary shown as a one-line preview in the UI (required when message is a string). Longer summaries are truncated to ${SUMMARY_MAX_CHARS} characters rather than rejected, and only the first line is shown.
