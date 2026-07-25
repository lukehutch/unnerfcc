<!--
name: 'Agent Prompt: Summary must be analysis+summary blocks'
description: >-
  Conversation-summarization agent guard: the entire response must be plain text
  — an <analysis> block followed by a <summary> block, no tool calls.
ccVersion: 2.1.219
-->


REMINDER: Do NOT call any tools. Respond with plain text only — an <analysis> block followed by a <summary> block. Tool calls will be rejected and you will fail the task.
