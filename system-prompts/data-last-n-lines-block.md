<!--
name: 'Data: Last N lines block'
description: 'Fenced block carrying the last N lines of output, with the line count.'
ccVersion: 2.1.219
variables:
  - LINE_COUNT
  - OUTPUT_TAIL
-->


### Last ${LINE_COUNT} lines

```
${OUTPUT_TAIL}
```
