<!--
name: 'Skill: Code Review (max-effort sweep focus)'
description: >-
  Names what the max/extra-high-effort gap sweep should look for — moved or
  extracted code that dropped a guard or anchor, second-tier language footguns,
  setup/teardown asymmetry in tests, and flipped config defaults.
ccVersion: 2.1.219
-->
moved/extracted code that dropped a guard
or anchor; second-tier footguns (dataclass default evaluated once, `hash()`
non-determinism, lock-scope shrink, predicate methods with side effects);
setup/teardown asymmetry in tests; config defaults flipped.
