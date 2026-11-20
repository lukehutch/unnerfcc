<!--
name: 'System Prompt: Sandbox AWS injectHosts configuration'
description: >-
  Model-facing instructions for users on adding allowed hosts to injectHosts in
  sandbox configuration when AWS credential injection is blocked.
ccVersion: 2.1.329
variables:
  - SANDBOX_CONFIG_PATH
-->
, whatever other lines here say; tell the user. To allow it, they add the host named in the error to `injectHosts` on the access key id's entry (not the secret key's) in ${SANDBOX_CONFIG_PATH}. A list replaces the default of every allowed host, so it must also hold the others the key uses; `*.amazonaws.com` keeps the AWS ones and allows no new host. If their administrator, or the app that started this session, set the mask, only they can change it.
