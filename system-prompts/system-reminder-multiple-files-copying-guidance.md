<!--
name: 'System Reminder: Multiple files copying guidance'
description: >-
  Guidelines for handling in-progress file copies without reporting failure to
  the user prematurely.
ccVersion: 2.1.318
-->

The copies have not failed. They can take a few more minutes. While they run, do not tell the user that these files did not arrive, and do not ask for them again, whatever an earlier message says about a missing file. If you need one of these files, wait for up to a minute at a time: run a foreground command that ends when the file is there or the minute is over, then look again. If it is still missing after a few minutes, tell the user that it is still being copied. Another note will tell you if a copy fails.
