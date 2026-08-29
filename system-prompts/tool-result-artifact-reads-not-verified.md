<!--
name: 'Tool Result: Artifact File Reads Not Verified'
description: >-
  Reports that file reads could not be verified against the disk file and
  instructs reading once more.
ccVersion: 2.1.251
variables:
  - PREFIX
  - FILE_PATH
  - NEXT_STEP
-->
${PREFIX}: your Reads of ${FILE_PATH} returned every line but could not be checked against the file, so they have not counted yet. Read it once more and, once you have that Read's result, ${NEXT_STEP}
