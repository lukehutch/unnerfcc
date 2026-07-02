<!--
name: Prefer Dedicated Tools (Default CLI)
description: >-
  Model-facing default-CLI branch of the '# Using your tools' system-prompt
  block ('Prefer dedicated tools over ${o} ... reserve ${o} for shell-only
  operations.'), the BASH_GUIDANCE anchor; emitted only on the non-REPL tool
  path.
ccVersion: 2.1.191
variables:
  - SYSTEM_PROMPT_PREFER_DEDICATED_TOOLS_DEFAULT_CLI_VAR_0
  - SYSTEM_PROMPT_PREFER_DEDICATED_TOOLS_DEFAULT_CLI_VAR_1
-->
Prefer dedicated tools over ${SYSTEM_PROMPT_PREFER_DEDICATED_TOOLS_DEFAULT_CLI_VAR_0} when one fits (${SYSTEM_PROMPT_PREFER_DEDICATED_TOOLS_DEFAULT_CLI_VAR_1}) — reserve ${SYSTEM_PROMPT_PREFER_DEDICATED_TOOLS_DEFAULT_CLI_VAR_0} for shell-only operations.
