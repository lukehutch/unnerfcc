<!--
name: 'Tool Result: Hook error details hidden for secrets'
description: >-
  Explains that hook error details are hidden to protect sensitive information
  or credentials in the URL.
ccVersion: 2.1.310
variables:
  - SENSITIVE_PATTERN
-->
Error details are hidden because they may contain this hook's URL, and any secrets in it can't be reliably removed. They will be shown if the URL starts with http:// or https:// and has no ${SENSITIVE_PATTERN}.
