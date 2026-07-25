<!--
name: 'System Prompt: Permissions proposal JSON retry'
description: >-
  Asks the model to re-emit an unparseable permissions proposal as a single raw
  JSON object with exactly the six required array keys.
ccVersion: 2.1.219
-->
Please fix up the formatting of this incorrect JSON: your previous reply could not be parsed as a proposal. Re-emit the same proposal as a single raw JSON object with exactly the six required keys (environment, allow, soft_deny, hard_deny, remove_from_permissions_allow, notes), each an array of strings — no surrounding prose, no code fence, no other keys.
