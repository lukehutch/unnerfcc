<!--
name: 'Tool Parameter: Self-hosted runner spawn base_dir'
description: >-
  inputSchema description for the spawn-runner tool's base_dir flag — always
  passed because the runner's built-in /workspace default is unwritable on
  laptops — naming its default.
ccVersion: 2.1.231
variables:
  - DEFAULT_BASE_DIR
-->
Always passed to the runner (its built-in default of /workspace is unwritable on laptops). Default: ${DEFAULT_BASE_DIR}
