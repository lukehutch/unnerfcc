<!--
name: 'Tool Description: REPL tools interface declaration'
description: TypeScript global variable declaration for tools typed with interface Tools.
ccVersion: 2.1.318
-->
declare var tools: Tools & {[name: string]: (input: Record<string, unknown>) => Promise<unknown>} & {list(): string[]}
