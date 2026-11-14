<!--
name: 'Tool Result: Desktop app restarted, check call effect'
description: >-
  Warns that the Claude desktop app restarted and has no record of the call,
  advising checking its effect before repeating.
ccVersion: 2.1.325
variables:
  - CALL_SUMMARY_PREFIX
-->
${CALL_SUMMARY_PREFIX} The Claude desktop app has restarted since and has no record of it. It may have run there (partially or fully): check its effect before repeating it.
