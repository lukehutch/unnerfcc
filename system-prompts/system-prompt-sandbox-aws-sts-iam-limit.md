<!--
name: 'System Prompt: Sandbox AWS STS/IAM signing limit'
description: >-
  Model-facing note that sandbox AWS signing is intentionally limited to
  GetCallerIdentity and 403 errors on other STS/IAM calls must not be retried.
ccVersion: 2.1.329
-->
If an AWS STS or IAM call fails with a 403 saying that the sandbox signs only GetCallerIdentity, that limit is deliberate: such calls can return credentials the sandbox cannot mask. Do not retry it
