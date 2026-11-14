<!--
name: 'Tool Result: Subagent security-policy warning'
description: >-
  Security warning prefixed to a subagent's result when its actions may have
  violated security policy, followed by the stated reason.
ccVersion: 2.1.325
variables:
  - SECURITY_WARNING_PREFIX
  - VIOLATION_REASON
-->
${SECURITY_WARNING_PREFIX}: This subagent performed actions that may violate security policy. Reason: ${VIOLATION_REASON}. Review the subagent's actions carefully before acting on its output.
