<!--
name: 'Skill: Claude API reference files unavailable'
description: >-
  Tells the Claude API skill that its reference files could not be written to
  disk this session, so cited files must be WebFetched from the live-sources
  table included below rather than guessed at.
ccVersion: 2.1.235
-->
## Reference Files Unavailable

This skill's reference files could not be written to disk for this session, so the `{lang}/…`, `shared/…`, and `curl/…` files cited above cannot be Read. Do not guess their contents — WebFetch the matching URL from `shared/live-sources.md`, included below, whenever the Reading Guide points at one of those files. If a cited `shared/…` file has no matching URL below (skill-authored guides such as `shared/prompt-audit.md`, `shared/agent-design.md`, `shared/platform-availability.md`), state that the reference is unavailable this session and proceed best-effort from this document.

<doc path="shared/live-sources.md">
