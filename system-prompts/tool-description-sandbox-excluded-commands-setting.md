<!--
name: 'Tool Description: Sandbox excluded commands setting advice'
description: >-
  Advises configuring sandbox.excludedCommands in settings to allow specific
  commands to run unsandboxed.
ccVersion: 2.1.310
variables:
  - CONFIG_FILE_OR_PATH
-->
list the whole command, or its start followed by ` *`, in `sandbox.excludedCommands` in ${CONFIG_FILE_OR_PATH}
