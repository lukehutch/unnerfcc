<!--
name: 'Tool Result: Connector send file missing or unreadable'
description: >-
  Error message informing the model that the target file does not exist, cannot
  be read or sent, or is a symlink leading outside the session's folders.
ccVersion: 2.1.325
variables:
  - FILE_PATH
  - EXTRA_NOTE
  - WORKAROUND_GUIDANCE
-->
${FILE_PATH}: there is no such file, or this session may not read or send it. Check the path; a link that leads out of this session's folders is not followed.${EXTRA_NOTE} ${WORKAROUND_GUIDANCE}
