<!--
name: 'Skill: Code Review (Angle E — wrapper/proxy correctness)'
description: >-
  The wrapper/proxy finder angle of the code-review skill — check that a newly
  added or modified wrapper routes every method to the wrapped instance rather
  than back through a registry, session, or global, and that it forwards all the
  methods its callers use.
ccVersion: 2.1.219
-->
### Angle E — wrapper/proxy correctness

When the PR adds or modifies a type that wraps another (cache, proxy, decorator,
adapter): check that every method routes to the wrapped instance and not back
through a registry/session/global — e.g. a caching provider holding a
`delegate` field that resolves IDs via `session.get(...)` instead of
`delegate.get(...)` will re-enter the cache or recurse. Also check that the
wrapper forwards all the methods the callers actually use.
