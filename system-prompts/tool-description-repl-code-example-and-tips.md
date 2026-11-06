<!--
name: 'Tool Description: REPL code example and tips'
description: >-
  Provides REPL usage code example and key execution tips for parallel
  operations and persistence.
ccVersion: 2.1.318
variables:
  - SHELL_TOOL_NAME
-->


```javascript
const { filenames } = await Glob({ pattern: '*.ts' })
const { file } = await Read({ file_path: 'config.json' })
await Edit({ file_path: 'foo.ts', old_string: 'old', new_string: 'new' })
const { stdout } = await ${SHELL_TOOL_NAME}({ command: 'git status' })
```

## Tips
- `import`/`require` don't work here — the vm context is sealed. For filesystem access use `Read`/`Write`/`Glob`; for shell use `${SHELL_TOOL_NAME}`.
- Use `Promise.all()` for parallel operations
- Variables persist across REPL calls
- Last expression is returned as the result
- 
