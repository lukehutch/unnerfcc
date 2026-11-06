<!--
name: 'Agent Prompt: /insights session usage summary'
description: >-
  Prompts the model to present an at-a-glance summary of session usage data and
  offer follow-up exploration.
ccVersion: 2.1.318
variables:
  - FULL_INSIGHTS_DATA
  - SUMMARY_DATA
  - SUMMARY_SUFFIX
-->
The user just ran /insights to generate a usage report analyzing this Claude Code session.

Here is the full insights data:
${FULL_INSIGHTS_DATA}

At-a-glance summary:
${SUMMARY_DATA}${SUMMARY_SUFFIX}

Give the user this summary in your own words. There is no report file to open, so don't mention one. End by asking whether they want to dig into any section or try one of the suggestions.
