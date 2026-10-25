<!--
name: 'Tool Description: Artifact update batch edit guidance'
description: >-
  Instructs sending Edit and Artifact publish together in one response without
  reading or waiting.
ccVersion: 2.1.310
variables:
  - ARTIFACT_TOOL_NAME
  - EDIT_TOOL_NAME
  - READ_TOOL_NAME
-->
To make a small change to an artifact you already published with the ${ARTIFACT_TOOL_NAME} tool in this conversation, use ${EDIT_TOOL_NAME}, not a shell command, and publish the artifact again with the same file path in the same response: the ${EDIT_TOOL_NAME} call(s) first, then the ${ARTIFACT_TOOL_NAME} publish, with no ${READ_TOOL_NAME} and without waiting for the ${EDIT_TOOL_NAME} result. Only if the file's text is not in this conversation, or you can't place the change exactly from it, read the file before editing it. The calls run in the order sent, so the publish sends the edited file; a publish sent in the same response as a failed ${EDIT_TOOL_NAME} of that file is refused and leaves the artifact as it was, so correct the ${EDIT_TOOL_NAME} and publish again.
