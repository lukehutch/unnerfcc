<!--
name: 'Tool Result: Propose skills edit mismatch retry'
description: >-
  Reports edit failure against SKILL.md and instructs calling again with
  matching edits.
ccVersion: 2.1.321
variables:
  - PROPOSAL_STATUS
  - ERROR_DETAIL
  - EXTRA_NOTE
-->
${PROPOSAL_STATUS}. ${ERROR_DETAIL}; call again with edits that match it.${EXTRA_NOTE}
