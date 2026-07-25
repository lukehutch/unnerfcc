<!--
name: 'Skill: Stuck daemon log and state files'
description: >-
  Section of the stuck-daemon diagnostic report embedding the daemon log and
  pointing at the other on-disk daemon state, warning that the roster holds user
  prompts and env vars.
ccVersion: 2.1.219
variables:
  - DAEMON_LOG_PATH
  - DAEMON_LOG_CONTENTS
-->

```

### Daemon log (`${DAEMON_LOG_PATH}`)
${DAEMON_LOG_CONTENTS}

Other daemon state on disk (Read if relevant — roster contains user prompts and env vars):
- `
