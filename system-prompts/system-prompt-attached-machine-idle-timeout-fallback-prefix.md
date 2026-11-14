<!--
name: 'System Prompt: Attached machine idle timeout fallback prefix'
description: >-
  Instructs not performing machine-specific work locally if the task still
  requires the timed-out machine's files, tools, or logins.
ccVersion: 2.1.325
variables:
  - TARGET_MACHINE
-->
; if the task still needs ${TARGET_MACHINE} files, tools or logins, do not do that part here: 
