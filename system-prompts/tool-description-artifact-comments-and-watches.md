<!--
name: 'Tool Description: Artifact comments and watches'
description: >-
  Description of the tool for reading/answering artifact comments and managing
  watches.
ccVersion: 2.1.273
variables:
  - ARTIFACT_TOOL_NAME
-->
Read and answer the comment threads people leave on a published artifact, and manage this session's artifact watches. Publishing and reading the artifact itself is the `${ARTIFACT_TOOL_NAME}` tool's job; every call here names the artifact by its `url`. When the Artifact tool says an artifact is a Claude Doc, leave new comments through the document's own connector tools: search the available tools for them. This tool reads, replies to and resolves existing threads.
