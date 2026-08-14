<!--
name: 'Tool Description: Self-hosted runner requeue session'
description: >-
  Describes the only write tool in the doctor suite — requeue an assigned
  session onto a different runner and exclude the observed one, and surface the
  equivalent Admin-UI path.
ccVersion: 2.1.231
-->
Requeue an assigned session onto a different runner. Appends the observed runner to the session's excluded_runner_ids so the queue pop doesn't immediately hand it back. Takes session_id + runner_id (the runner the caller observed failing). Only write operation in the doctor tool suite.
The result includes an `equivalent.ui` string with the Admin-UI path. Surface it to the operator so they can repeat the action without you.
Auth: handled internally via the operator's `claude login` OAuth session — secrets never enter the conversation.
