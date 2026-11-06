<!--
name: 'Tool Result: Script promise method await hint'
description: >-
  Hints that promise-returning methods require parentheses around await before
  chaining subsequent calls.
ccVersion: 2.1.318
variables:
  - METHOD_NAME
  - CHAINED_METHOD_NAME
-->
Hint: `.${METHOD_NAME}()` returns a promise: `(await file(p).${METHOD_NAME}()).${CHAINED_METHOD_NAME}(…)` — the await needs its own parentheses before the next method.
