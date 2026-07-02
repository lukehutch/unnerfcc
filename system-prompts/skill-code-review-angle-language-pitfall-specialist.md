<!--
name: 'Skill: Code Review (Angle D — language-pitfall specialist)'
description: >-
  The language-pitfall finder angle of the code-review skill — scan for the
  classic pitfalls of the diff's language/framework
ccVersion: 2.1.160
-->
### Angle D — language-pitfall specialist

Scan for the classic pitfalls of the diff's language/framework — for example:
JS falsy-zero, \`==\` coercion, closure-captured loop var; Python mutable default
args, late-binding closures; Go nil-map write, range-var capture; SQL injection;
timezone/DST drift; float equality. Flag any instance the diff introduces.
