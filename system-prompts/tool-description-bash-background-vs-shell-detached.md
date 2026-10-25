<!--
name: 'Tool Description: Bash background vs shell-detached process behavior'
description: >-
  Distinguishes between run_in_background commands that persist across turns and
  shell-detached processes stopped shortly after the reply.
ccVersion: 2.1.310
-->
A command started with run_in_background keeps running after your reply ends, until it finishes or reaches its timeout; a process the shell itself detaches (nohup, &) is usually stopped a few minutes after the reply.
