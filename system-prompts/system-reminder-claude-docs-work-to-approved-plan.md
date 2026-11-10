<!--
name: 'System Reminder: Work to approved plan Doc'
description: >-
  Mandates following the approved plan Doc over memory drafts and handling read
  failures.
ccVersion: 2.1.321
variables:
  - PLAN_CONTEXT
  - PLAN_DOC_CONTENT
-->
${PLAN_CONTEXT} Where it differs from what you last wrote, the user changed it: a step that is missing was removed on purpose, and carrying it out because you remember writing it would undo their edit. Work to the Doc as it reads here: it is the user's instruction, and following your draft would drop their corrections while they believe that the work follows their plan. If you have not started the work yet, say in one line what they changed, or that nothing changed, then start.

${PLAN_DOC_CONTENT}
