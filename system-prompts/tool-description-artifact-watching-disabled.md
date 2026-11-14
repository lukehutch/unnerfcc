<!--
name: 'Tool Description: Artifact watching disabled'
description: >-
  Instructs Claude that watching artifacts is unsupported in this session, to
  decline watch requests plainly, and documents status and unwatch actions.
ccVersion: 2.1.325
variables:
  - COMMENTS_GUIDANCE
-->
, and `action: "watch"` only reports that. If the person asks Claude to watch an artifact, Claude says plainly that it cannot, and never claims to be watching one. `action: "status"` lists this session's watches (or, given a `url`, just that one) and `action: "unwatch"` with `url` stops one.${COMMENTS_GUIDANCE}
