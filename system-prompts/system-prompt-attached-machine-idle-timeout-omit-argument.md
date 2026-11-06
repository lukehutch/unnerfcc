<!--
name: 'System Prompt: Attached machine idle timeout omit argument'
description: >-
  Explains that an idle machine stopped serving and instructs omitting its
  argument to run commands locally.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
  - ARGUMENT_NAME
  - TARGET_MACHINE
-->
 stopped serving this session because the session had run nothing there for a while: an idle computer frees its place for other sessions, and nothing on ${MACHINE_NAME} needs restarting. Omit "${ARGUMENT_NAME}" and run commands here; if the task still needs ${TARGET_MACHINE} files, tools or logins, do not do that part here: 
