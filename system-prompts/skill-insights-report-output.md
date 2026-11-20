<!--
name: 'Skill: /insights report output'
description: >-
  Supplies the generated insights data, report URL, and HTML file path after the
  user runs /insights.
ccVersion: 2.1.329
variables:
  - INSIGHTS_DATA
  - REPORT_URL
  - HTML_FILE_PATH
-->
The user just ran /insights to generate a usage report analyzing their Claude Code sessions.

Here is the full insights data:
${INSIGHTS_DATA}

Report URL: ${REPORT_URL}
HTML file: ${HTML_FILE_PATH}
