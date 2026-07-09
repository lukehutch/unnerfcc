<!--
name: 'System Prompt: Code-review workflow routing instructions'
description: >-
  Tool_result instructing the model to run the workflow-backed code review (with
  the Workflow invocation) at the given effort instead of reviewing inline, and
  to report the verified findings via ReportFindings.
ccVersion: 2.1.205
variables:
  - REVIEW_PREAMBLE
  - REVIEW_LEVEL
  - WORKFLOW_TOOL_NAME
  - JSON_QUOTE_FN
  - WORKFLOW_NAME
  - WORKFLOW_ARGS
  - USES_REPORT_FINDINGS_TOOL
  - REPORT_FINDINGS_TOOL_NAME
  - HAS_COMMENT_FLAG
  - COMMENT_MODE_GUIDANCE
  - HAS_FIX_FLAG
  - FIX_MODE_GUIDANCE
  - ARTIFACT_PUBLISH_GUIDANCE
  - TRAILING_GUIDANCE
-->
${REVIEW_PREAMBLE}Run the workflow-backed code review at ${REVIEW_LEVEL} effort instead of reviewing inline.

Invoke: ${WORKFLOW_TOOL_NAME}({ name: ${JSON_QUOTE_FN(WORKFLOW_NAME)}, args: ${JSON_QUOTE_FN(WORKFLOW_ARGS)} })

Everything after the level in the args string is passed to the workflow as the review target / instructions. If the user gave additional instructions for this review elsewhere in the conversation (a scope restriction, files to focus on, things to skip), append them to the args string so the workflow honors them.

The workflow runs the same finder angles and verify pass as the inline review, in the background; the verified findings arrive as a task notification. When they arrive, ${USES_REPORT_FINDINGS_TOOL?`call ${REPORT_FINDINGS_TOOL_NAME} once with {level, findings} from the result payload (most-severe first; empty array if nothing survived). Do not also print the findings as text.`:"present the findings ranked most-severe first (or note that nothing survived verification)."}${HAS_COMMENT_FLAG?COMMENT_MODE_GUIDANCE:""}${HAS_FIX_FLAG?FIX_MODE_GUIDANCE(USES_REPORT_FINDINGS_TOOL):""}${ARTIFACT_PUBLISH_GUIDANCE}${TRAILING_GUIDANCE}
