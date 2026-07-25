<!--
name: 'Tool Description: Publish PR review artifact'
description: >-
  Describes the artifact operation that builds a PR-review page from the
  structured payload authored by the artifact-pr-review skill.
ccVersion: 2.1.219
-->
Publish a composed PR review page: file_path names the structured payload .json the artifact-pr-review skill had you author, and the page is built from the bundled review template at publish time. The payload's `pr` must name the PR this session's review invocation targets.
