<!--
name: 'Tool Result: Host client folder permissions restriction'
description: >-
  Model-facing notice that file tools are restricted to host-allowed folders and
  other hooked tools are blocked until the host client answers.
ccVersion: 2.1.329
-->
 Until the host client answers, file tools read only inside the folders that it allowed for this session and write only in those that it did not mark read-only; other tools under this hook do not run. Retrying this call will not help: work inside those folders, or go on with other work.
