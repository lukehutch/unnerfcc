<!--
name: 'Tool Result: Git safety maintenance runtime expansion'
description: >-
  Model-facing git safety warning that a runtime-expanded argument prevents
  verifying whether background git maintenance would modify global git config.
ccVersion: 2.1.325
-->
) that is filled in only when the command runs, so this check can't tell whether it registers the repository for background git maintenance, which would write your global git configuration
