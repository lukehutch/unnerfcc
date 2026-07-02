<!--
name: 'Skill: Code Review (Angle E — wrapper/proxy correctness)'
description: >-
  The wrapper/proxy finder angle of the code-review skill — when a type wraps
  another (cache, proxy, decorator), check the forwarding is faithful
ccVersion: 2.1.160
-->
### Angle E — wrapper/proxy correctness

When the PR adds or modifies a type that wraps another (cache, proxy, decorator,
adapter): check that every method routes to the wrapped instance and not back
through a registry/session/global — e.g. a caching provider holding a
\`delegate\` field that resolves IDs via \`session.get(...)\` instead of
\`delegate.get(...)\` will re-enter the cache or recurse. Also check that the
wrapper forwards all the methods the callers actually use.
