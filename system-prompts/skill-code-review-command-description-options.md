<!--
name: 'Skill: Code Review command description options'
description: >-
  Description of /review command options including effort levels, --comment,
  --fix, and --max-findings.
ccVersion: 2.1.318
variables:
  - DEFAULT_EFFORT_LEVEL_NOTE
  - EXTRA_OPTIONS_NOTE
-->
: from few high-confidence findings to many, some uncertain${DEFAULT_EFFORT_LEVEL_NOTE}); with no level given, it reuses the level you typed last. Pass --comment to post findings as inline PR comments, or --fix to apply them to the working tree after the review. Pass --max-findings <n> to report up to n findings, or --max-findings all for every finding. The choice stays until you pass --max-findings default.${EXTRA_OPTIONS_NOTE}
