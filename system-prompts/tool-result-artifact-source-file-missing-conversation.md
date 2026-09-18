<!--
name: 'Tool Result: Artifact source file missing on machine'
description: >-
  Reports that the source file previously published by this conversation is
  missing from the local machine.
ccVersion: 2.1.277
variables:
  - ARTIFACT_IDENTIFIER
  - ERROR_DETAILS
-->
This conversation published ${ARTIFACT_IDENTIFIER} from this path, but the file is no longer on this machine (${ERROR_DETAILS})
