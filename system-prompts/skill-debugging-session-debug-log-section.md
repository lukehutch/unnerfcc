<!--
name: 'Skill: Debugging (session debug log section)'
description: >-
  Debugging-skill section giving the current session's debug log path and
  telling the model to grep it for [ERROR] and [WARN] lines.
ccVersion: 2.1.219
variables:
  - DEBUG_LOG_PATH
  - DEBUG_LOG_EXCERPT
  - ADDITIONAL_LOG_CONTEXT
-->

## Session Debug Log

The debug log for the current session is at: `${DEBUG_LOG_PATH}`

${DEBUG_LOG_EXCERPT}

For additional context, grep for [ERROR] and [WARN] lines across the full file.

${ADDITIONAL_LOG_CONTEXT}

## Issue Description

