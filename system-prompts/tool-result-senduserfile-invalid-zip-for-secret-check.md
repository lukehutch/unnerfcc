<!--
name: 'Tool Result: Archive unreadable for secret key check'
description: >-
  Informs the model that an archive could not be read as a plain zip for
  secret-key checking and instructs recreating it with zip -r.
ccVersion: 2.1.325
variables:
  - CALL_PREFIX
  - ARCHIVE_PATH
  - PACKAGING_REFERENCE
-->
${CALL_PREFIX}${ARCHIVE_PATH} could not be read as a plain zip file, so its files could not be checked for secret keys. Make it again with `zip -r`, as in step 4 of ${PACKAGING_REFERENCE}, and send that.
