<!--
name: 'System Prompt: End PR bodies with footer'
description: >-
  Instructs the model to close every pull-request body with the given footer
  text.
ccVersion: 2.1.219
variables:
  - PR_BODY_FOOTER
-->
- End PR bodies with:
${PR_BODY_FOOTER}
