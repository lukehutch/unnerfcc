<!--
name: 'Skill: /stuck daemon section'
description: Daemon section of the /stuck slash command
ccVersion: 2.1.141
variables:
  - SKILL_STUCK_DAEMON_SECTION_VAR_0
  - SKILL_STUCK_DAEMON_SECTION_VAR_1
  - SKILL_STUCK_DAEMON_SECTION_VAR_2
  - SKILL_STUCK_DAEMON_SECTION_VAR_3
  - SKILL_STUCK_DAEMON_SECTION_VAR_4
  - SKILL_STUCK_DAEMON_SECTION_VAR_5
-->
## Daemon

The background daemon manages \`& <prompt>\` jobs and \`claude agents\`. If the issue involves background sessions, look here.

### daemon.lock
\`\`\`json
${SKILL_STUCK_DAEMON_SECTION_VAR_0??"(missing)"}
\`\`\`

### daemon.status.json
\`\`\`json
${SKILL_STUCK_DAEMON_SECTION_VAR_1??"(missing)"}
\`\`\`

### Daemon log (\`${SKILL_STUCK_DAEMON_SECTION_VAR_2}\`)
${SKILL_STUCK_DAEMON_SECTION_VAR_3}

Other daemon state on disk (Read if relevant — roster contains user prompts and env vars):
- \`${SKILL_STUCK_DAEMON_SECTION_VAR_4()}\` — live worker roster
- \`${SKILL_STUCK_DAEMON_SECTION_VAR_5()}/<short>/state.json\` — per-job state
