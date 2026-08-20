<!--
name: 'Tool Description: Artifact runtime capabilities'
description: >-
  Requires loading the artifact runtime skill before declaring capabilities or
  writing any window.claude.* runtime code.
ccVersion: 2.1.231
variables:
  - ARTIFACT_RUNTIME_SKILL_NAME
-->
**Runtime capabilities** (optional): depending on what is enabled for this user, a published page can do more than static HTML — stay live with fresh data, keep state shared between viewers, hand the viewer a file to save, or update itself — declared via the `capabilities` input. **Whenever the user asks for a page that needs any of that, you MUST load the `${ARTIFACT_RUNTIME_SKILL_NAME}` skill BEFORE writing the artifact, and always before passing `capabilities` or writing any `window.claude.*` runtime code** — it tells you what's available to this user and how to use it. Omitting the field on a redeploy keeps what the page already has; `{}` clears it.
