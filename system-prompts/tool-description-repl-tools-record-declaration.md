<!--
name: 'Tool Description: REPL tools record declaration'
description: TypeScript global variable declaration for the generic tools object.
ccVersion: 2.1.318
-->
declare var tools: {[name: string]: (input: Record<string, unknown>) => Promise<unknown>} & {list(): string[]}
