<!--
name: 'System Reminder: Sandbox high CPU limit enforcement guidance'
description: >-
  Explains CPU throttling limits, command terminations, and how to scale down
  future work.
ccVersion: 2.1.318
-->
. At the limit, Claude Code stops the shell commands of this session and the processes that they started, also those that used little CPU. The commands themselves did not fail. The files are kept. Commands that use little CPU, such as a dev server, can start again. Work that fills the CPUs again will be stopped again, so do not start it again in the same form. Tell the user what was stopped and why. If the heavy work is still necessary, first agree with the user on a form that uses less CPU, for example a smaller job or fewer parallel workers.
