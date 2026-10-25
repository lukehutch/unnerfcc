<!--
name: 'Tool Result: Publish copies omitted with removal conflict'
description: >-
  Explains that omitted copies combined with file removals could delete replaced
  files and advises how to republish safely.
ccVersion: 2.1.310
variables:
  - REASON_PREFIX
  - EXPLANATION
  - ADDITIONAL_NOTE
-->
${REASON_PREFIX}, and this publish also removes files, so publishing without the copies could remove a file one of them was meant to replace. ${EXPLANATION} To save the rest, publish again without the left-out copies, and keep any file one of them was meant to replace. ${ADDITIONAL_NOTE}
