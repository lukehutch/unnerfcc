<!--
name: 'Tool Description: Artifact Watch Registration and Status (Remote)'
description: >-
  Explains background watch registration, status checks, and criteria for
  confirming a watch is active in remote sessions.
ccVersion: 2.1.257
-->
 Publishing an artifact starts registering its watch in the background, and the result line says whether that began, was skipped, or was already registered; `action: "status"` lists the watches that actually registered and what wakes each (pass `url` to check one). To watch an artifact you did not just publish, pass `action: "watch"` with its `url`; `action: "unwatch"` with `url` stops one. Do not claim you are watching an artifact unless a watch result, `status`, or a publish result's "already registered" line says so — its "arming" line is not yet a watch.
