<!--
name: 'Skill: Code Review (altitude dimension)'
description: >-
  Code-review dimension: check whether each change is implemented at the right
  depth rather than as a fragile special case
ccVersion: 2.1.263
-->
### Altitude

Check that each change fixes the root cause at the right depth rather than
patching a symptom with a fragile bandaid. Special cases layered on shared
infrastructure are a sign the fix isn't deep enough — prefer the simpler, more
general change to the underlying mechanism over adding special cases, and name
that change.
