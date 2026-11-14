<!--
name: 'System Prompt: Attached machine idle timeout reason'
description: >-
  Explains that an idle attached machine stopped serving the session to free
  capacity and needs no restarting.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
-->
 stopped serving this session because the session had run nothing there for a while: an idle computer frees its place for other sessions, and nothing on ${MACHINE_NAME} needs restarting. 
