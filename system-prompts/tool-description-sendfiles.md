<!--
name: 'Tool Description: SendFiles'
description: >-
  Describes the SendFiles tool for handing files to another local, peer, or
  cloud Claude Code session along with a message.
ccVersion: 2.1.219
variables:
  - SEND_MESSAGE_TOOL_NAME
  - LIST_AGENTS_TOOL_NAME
  - MAX_FILE_SIZE_MIB
  - MAX_FILES_PER_SEND
  - SEND_FILES_TOOL_NAME
-->
Send files to another Claude Code session — a peer session on this machine, or a Remote Control / cloud session on another machine. The receiving Claude gets the files on its own filesystem with @path references, plus your message.

Use this when a file is the thing to hand over — a doc with figures, a screenshot, a report, a build artifact. For plain text, use ${SEND_MESSAGE_TOOL_NAME} instead. For agents inside this session (subagents, teammates), also use ${SEND_MESSAGE_TOOL_NAME} — they share your filesystem and can read the file at its path directly.

`to` accepts a peer session name from ${LIST_AGENTS_TOOL_NAME}, or an explicit `uds:<socket>` / `bridge:<session id>` address.

Each file is capped at ${MAX_FILE_SIZE_MIB} MiB, at most ${MAX_FILES_PER_SEND} files per send. Files must exist on the local filesystem — write content to a file first if needed. The receiver verifies each file against a sha256 digest of what was sent (where the transport carries it) and refuses a mismatch with a visible note.

Example: ${SEND_FILES_TOOL_NAME}({ to: "devbox", files: ["report.pdf", "figures/plot.png"], message: "Here's the doc with figures." })
