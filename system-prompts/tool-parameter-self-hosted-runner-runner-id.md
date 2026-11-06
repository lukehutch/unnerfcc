<!--
name: 'Tool Parameter: Self-hosted runner runner id'
description: >-
  Describes the tagged runner id input, verification against session assignment,
  and fallback handling for stuck sessions.
ccVersion: 2.1.318
-->
Tagged runner id (ccrunner_…) the caller observed failing. Server verifies this still matches the session assignment; mismatch returns Conflict. For a stuck session with no runner assigned, pass any runner id of this environment, such as one of the excluded_runner_ids of the session; the server does not compare it.
