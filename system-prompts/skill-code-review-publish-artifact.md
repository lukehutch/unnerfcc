<!--
name: 'Code Review: Publish shareable artifact'
description: >-
  Instructions appended to the code-review flow telling the reviewer agent to
  publish its findings as a shareable HTML artifact via the artifact skill/tool.
ccVersion: 2.1.199
variables:
  - SKILL_CODE_REVIEW_PUBLISH_ARTIFACT_VAR_0
  - SKILL_CODE_REVIEW_PUBLISH_ARTIFACT_VAR_1
  - SKILL_CODE_REVIEW_PUBLISH_ARTIFACT_VAR_2
-->


## Publishing a shareable review (Artifact)

After the findings are produced, also publish them as an artifact so they can
be shared and iterated on outside the terminal:

1. Load the \`${SKILL_CODE_REVIEW_PUBLISH_ARTIFACT_VAR_0}\` skill (utilitarian treatment —
   this is a document).
2. Write the findings to an HTML file: one section per finding with the file
   path and line, the one-line summary, the concrete failure scenario, and the
   relevant code snippet. If nothing survived verification, the page says so
   in one line.
3. Call the ${SKILL_CODE_REVIEW_PUBLISH_ARTIFACT_VAR_1} tool with that file path.
4. End the page body with this line verbatim:

   > ${SKILL_CODE_REVIEW_PUBLISH_ARTIFACT_VAR_2}

Skip this step if the review was invoked only to feed another tool (e.g. a
workflow step whose caller handles its own output).
