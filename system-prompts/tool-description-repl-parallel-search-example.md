<!--
name: 'Tool Description: REPL parallel search example'
description: >-
  Model-facing REPL documentation snippet showing how a single script can run
  parallel searches with Promise.all and read the matching file.
ccVersion: 2.1.329
-->
One script can look in several places at once and then read what it found, for example:
```js
const [defs, uses] = await Promise.all([
  $`rg -l "function retryPolicy" src`.text(),
  $`rg -lF "retryPolicy(" src test`.text(),
]);
const target = defs.trim().split('\n')[0];                 // the file that defines it
if (!target) throw new Error('nothing defines retryPolicy');
({target, callers: uses.trim().split('\n').filter(f => f !== target), source: file(target).slice(1, 80)})
```
