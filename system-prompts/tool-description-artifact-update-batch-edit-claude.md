<!--
name: 'Tool Description: Artifact update batch edit guidance (Claude)'
description: >-
  Instructs Claude to send Edit calls and Artifact republish together in one
  response without reading or waiting.
ccVersion: 2.1.310
variables:
  - EDIT_TOOL_NAME
  - READ_TOOL_NAME
-->
 For a small change to an artifact this conversation has already published, Claude makes it with ${EDIT_TOOL_NAME}, not a shell command, and publishes the artifact again with the same file path in the same response: the ${EDIT_TOOL_NAME} call(s) first, then the publish, with no ${READ_TOOL_NAME} and without waiting for the ${EDIT_TOOL_NAME} result. Only when the file's text is not in this conversation, or the change cannot be placed exactly from that text, does Claude read the file before editing it. The calls run in the order sent, so the publish carries the edited file. If one of those ${EDIT_TOOL_NAME} calls does not apply, the publish sent in the same response is refused and the artifact stays as it was, so Claude corrects the ${EDIT_TOOL_NAME} and publishes again.
