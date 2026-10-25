<!--
name: 'Tool Result: Prior edit failed so artifact publish was aborted'
description: >-
  Explains that an edit or write in the same response failed, aborting the
  publish until the file change is settled.
ccVersion: 2.1.310
variables:
  - FILE_PATH
-->
The Edit or Write of ${FILE_PATH} sent earlier in the same response as this publish did not apply (its own result says why), so nothing was published and any existing artifact is unchanged. Settle that change first (correct it, or leave the file as it is if the change was declined), then publish again.
