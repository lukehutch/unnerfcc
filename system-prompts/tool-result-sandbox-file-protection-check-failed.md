<!--
name: 'Tool Result: Sandbox file protection check failed'
description: >-
  Explains that the command was not run because sandbox file protection checks
  failed and provides recovery steps.
ccVersion: 2.1.310
-->
The sandbox could not check that Claude Code's own files are still protected, so this command was not run. Try it once more. If it fails the same way, stop and tell the user: restarting Claude Code may clear it. If it does not, CLAUDE_CODE_SANDBOX_LEAVE_DENIES_TO_SRT_WIN=1 in the environment that Claude Code is started from (a settings file cannot set it) turns this check off, but the sandbox may then fail to start on a large profile.
