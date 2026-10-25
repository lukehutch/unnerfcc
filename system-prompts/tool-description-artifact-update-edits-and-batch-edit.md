<!--
name: 'Tool Description: Artifact update with edits parameter and batch editing'
description: >-
  Instructs using edits parameter on publish for single-file changes or batching
  Edit calls for multi-file changes.
ccVersion: 2.1.310
variables:
  - ARTIFACT_TOOL_NAME
  - READ_TOOL_NAME
  - EDIT_TOOL_NAME
-->
To make a small change to a page you already published with the ${ARTIFACT_TOOL_NAME} tool in this conversation, send it as `edits` (old_str/new_str pairs copied exactly from the file as it now stands) on an ${ARTIFACT_TOOL_NAME} publish of the same `file_path`: that one call changes the file and the page together, with no ${READ_TOOL_NAME} and no ${EDIT_TOOL_NAME}. For a change to several files at once, or a rewrite of most of a page, use ${EDIT_TOOL_NAME} on the file(s), not a shell command, and publish the artifact again with the same `file_path` in the same response: the ${EDIT_TOOL_NAME} call(s) first, then the ${ARTIFACT_TOOL_NAME} publish, with no ${READ_TOOL_NAME} and without waiting for the ${EDIT_TOOL_NAME} result. The calls run in the order sent, so the publish carries the edited file; a publish sent in the same response as a failed ${EDIT_TOOL_NAME} of that file is refused and leaves the artifact as it was, so correct the ${EDIT_TOOL_NAME} and publish again. Either way, read the file first only if its text is not in this conversation or you can't place the change exactly from it.
