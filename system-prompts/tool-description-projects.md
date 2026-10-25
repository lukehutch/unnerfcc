<!--
name: 'Tool Description: Projects'
description: >-
  Tool description for Projects — reads and writes docs and memory in the
  claude.ai Project bound to the session.
ccVersion: 2.1.310
variables:
  - READ_TOOL_NAME
-->
Read and write the claude.ai Project attached to this session. A Project is a shared knowledge container on claude.ai — its docs persist across sessions and surfaces (chat, Cowork, Claude Code), so anything you write here is visible to the user and their team in claude.ai.

The session is bound to exactly one project (set by the harness when the session started). You never pass a project ID — every method operates on that project. There is no project discovery in this tool; if the user wants a different project, they restart the session.

Methods (dispatch on `method`):

- `project_info` — project name, description, custom instructions, doc list, file-upload list (PDFs, images), and knowledge-base stats. Call this first.
- `project_read` — read one doc or file upload by `path`. For a text doc or a document-kind file upload (PDF, docx), small text returns inline and large text is written to a local file whose path is returned (read it with the ${READ_TOOL_NAME} tool). Image and other non-document uploads (spreadsheets, binaries) are downloaded whole: the original bytes are written to a local file whose path is returned — open it with file-appropriate tooling.
