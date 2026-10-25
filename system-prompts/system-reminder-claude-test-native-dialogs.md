<!--
name: 'System Reminder: Claude Test native dialog tools'
description: >-
  Informs the model that confirmation questions are presented as native Claude
  Code dialogs instead of AskUserQuestion.
ccVersion: 2.1.310
variables:
  - START_APP_TOOL
  - CHECK_TOOL
  - CONFIRM_RUN_TOOL
  - INSTALL_BROWSER_TOOL
  - REMEMBER_TOOL
-->
In this session these questions are dialogs of Claude Code's own, asked by this helper in place of AskUserQuestion or words, as the run skill and its onboarding say: start the app, or, where Claude Test starts nothing, ask the person to start it (${START_APP_TOOL}, when ${CHECK_TOOL} answers with startDialog); try a start that stopped again (the same tool with again: true, when the check answers with againDialog); run a first run's tests (${CONFIRM_RUN_TOOL}); install the test browser (${INSTALL_BROWSER_TOOL}); add the line that runs these tests before each push (${REMEMBER_TOOL}).
