<!--
name: 'Tool Result: Artifact File Not Read Whole'
description: >-
  Reports that the artifact file has not been read in full and instructs reading
  every line before proceeding.
ccVersion: 2.1.251
variables:
  - PREFIX
  - FILE_PATH
  - NEXT_STEP
-->
${PREFIX}: ${FILE_PATH} has not yet been Read whole. Once you have Read every line and have that Read's result, ${NEXT_STEP}
