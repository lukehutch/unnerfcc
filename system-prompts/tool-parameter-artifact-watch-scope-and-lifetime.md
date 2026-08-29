<!--
name: 'Tool Parameter: Artifact watch scope and lifetime'
description: >-
  Details unwatch, status, watch lifetimes, and which session types can hold
  artifact watches.
ccVersion: 2.1.251
-->
; 'unwatch' stops that subscription; 'status' lists this session's artifact watches (pass `url` to check one). Watches live only as long as this session, and only an interactive or SDK main-loop session holds one — a subagent, teammate, background, or print session's publish or 'watch' arms none.
