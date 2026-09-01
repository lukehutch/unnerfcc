<!--
name: 'Tool Description: Artifact read action overview'
description: >-
  Describes the read action behavior for owned, shared, and channel-published
  artifacts.
ccVersion: 2.1.257
variables:
  - READ_PARAMS_NOTE
  - FILE_PATH_NOTE
-->
- **read**: `url` — the published page's content, also wherever a skill or notice tells you to fetch or re-read an artifact. The user's own artifact comes back as raw HTML (a large page is saved to a local file the result names); one shared with the user comes back as an isolated summary (say what you need in `prompt`), except a page published in this session's own Slack channel, which can come back in full as untrusted content.${READ_PARAMS_NOTE}${FILE_PATH_NOTE}
