<!--
name: 'Tool Result: Artifact cached capability denial repeated'
description: >-
  Repeats a cached server refusal regarding artifact capabilities, noting the
  re-check interval.
ccVersion: 2.1.321
variables:
  - CACHED_ANSWER
-->
${CACHED_ANSWER} (this repeats the server's answer from earlier in this session; the call was not sent. The server is asked again an hour after that answer, or sooner if this session publishes the artifact, sees a new version of it, or sees its capabilities include a database)
