<!--
name: 'Tool Result: REPL unawaited Promise coerced to string'
description: >-
  Warns that an unawaited Promise was coerced to a string and explains when
  await is required.
ccVersion: 2.1.318
-->
REPL: unawaited Promise coerced to string. A result used inline needs 'await' — e.g. const c = await file(f).text(); await write(f, c + s). Only the top-level keys of a returned object are awaited for you.
