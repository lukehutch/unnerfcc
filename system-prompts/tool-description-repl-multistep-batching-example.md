<!--
name: 'Tool Description: REPL multi-step batching example'
description: >-
  Example script demonstrating parallel search and subsequent file edit in a
  single REPL call.
ccVersion: 2.1.318
-->
One script can look in several places at once and then act on what it found, for example:
```js
const [defs, uses] = await Promise.all([
  $`rg -l "function retryPolicy" src`.text(),
  $`rg -lF "retryPolicy(" src test`.text(),
]);
const target = defs.trim().split('\n')[0];                 // the file that defines it
if (!target) throw new Error('nothing defines retryPolicy: not editing');
await edit(target, 'maxAttempts: 3', 'maxAttempts: 5');
({edited: target, callers: uses.trim().split('\n').filter(f => f !== target), test: $`npm test -- retryPolicy`.nothrow()})
```
