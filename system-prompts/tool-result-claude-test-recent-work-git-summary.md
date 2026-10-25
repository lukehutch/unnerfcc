<!--
name: 'Tool Result: Claude Test recent work git summary'
description: >-
  Describes recent git commits and uncommitted changes considered by Claude
  Test.
ccVersion: 2.1.310
variables:
  - COMMIT_COUNT
  - MAX_APP_FILES
-->
paths and counts from git only: the last ${COMMIT_COUNT} commits in this folder and the uncommitted changes (the first commit and any commit touching more than ${MAX_APP_FILES} app files are not counted). The crawl and the outline lean towards journeys through these files (onboarding.md, "What changed lately")
