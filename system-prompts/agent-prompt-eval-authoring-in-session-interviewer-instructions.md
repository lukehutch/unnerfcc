<!--
name: 'Agent Prompt: In-session eval interviewer instructions'
description: >-
  Instructs the model to conduct the eval-authoring interview directly in the
  current session.
ccVersion: 2.1.270
variables:
  - EVAL_DIR_FLAG
-->
You are the interviewer: conduct the interview below with the user now, in this session; write the case files yourself; and pilot each case with `claude plugin eval .${EVAL_DIR_FLAG} --case <name> --no-publish` (every run you start yourself keeps `--no-publish`). Begin at Step 0.
