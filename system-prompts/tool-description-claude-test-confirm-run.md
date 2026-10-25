<!--
name: 'Tool Description: claude_test_confirm_run'
description: >-
  Presents a first-run test outline in a native dialog for user approval or
  modification.
ccVersion: 2.1.310
-->
Ask the person, in a dialog of Claude Code's own, whether to run the tests of a first run's outline (onboarding F3), in place of the AskUserQuestion that ends in "Would you like to run these <n> tests?". Pass project as status's projectDir, count as the number of tests, tests as the outline's numbered lines, one string each without its number, and notCovered as its "Not covered" lines, at most three. The dialog opens with "Run these <n> tests? Claude wrote this list:", then numbers, wraps and shows the lines as they were passed, with invisible characters taken out and control characters and runs of white space made one space, then "Not covered:" and those lines joined by " · ", and ends in "Accept: run them. Decline: say what to change." and those two buttons; it asks nothing when it does not fit whole. The answer is "run" (Accept: their yes, F4), "change" (Decline), or answer null when neither came (the dialog was closed or timed out). It runs nothing; it keeps the tests it asked in the run folder, for the panel. A background run never calls it.
