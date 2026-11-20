<!--
name: 'Tool Result: Command sandboxed by permission check'
description: >-
  Explains that a command ran in the sandbox despite exemption settings because
  its permission check relied on sandboxing.
ccVersion: 2.1.329
-->
This command started in the sandbox because its permission check relied on the sandbox, although the settings or this call's input exempt it. Sandbox limits may explain a failure here. Running it again repeats the permission check, which may keep it in the sandbox again.
