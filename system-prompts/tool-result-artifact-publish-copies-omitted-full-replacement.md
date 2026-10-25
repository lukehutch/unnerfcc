<!--
name: 'Tool Result: Publish copies omitted with full replacement'
description: >-
  Explains that full replacement publishing without omitted copies risks
  deleting files and directs reading existing files first.
ccVersion: 2.1.310
variables:
  - REASON_PREFIX
  - EXPLANATION
  - ADDITIONAL_NOTE
-->
${REASON_PREFIX}, and this publish replaces every file in the artifact, so publishing without the copies could delete a file it has. ${EXPLANATION} To save the rest, read the artifact to see which files it has, then publish again without the left-out copies. ${ADDITIONAL_NOTE}
