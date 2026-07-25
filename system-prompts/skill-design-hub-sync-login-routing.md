<!--
name: 'Skill: /design hub sync and login routing'
description: >-
  Table row telling the /design hub to hand `sync` and `login` back to their
  dedicated commands and stop rather than guessing at availability.
ccVersion: 2.1.219
-->
| `sync` / `login` | Ask the user to run `/design sync` or `/design login` themselves — when this session offers them, typing the command directly routes to the dedicated `/design-sync` / `/design-login` surfaces, which this prompt cannot reach; if the session does not offer them, say that instead. Do not guess at their availability, and stop. |
