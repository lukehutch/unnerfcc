<!--
name: 'Tool Result: ws-decisions island grammar failure'
description: >-
  Rejection message telling the model its ws-decisions island violated the entry
  grammar and must be re-emitted from its decision blocks.
ccVersion: 2.1.219
-->
The ws-decisions island failed the entry grammar: one {"items":[…]} object, each entry exactly {id, opts, state, choice, custom} with slug ids and opts, state open|resolved, and the resolution invariant (open: neither choice nor custom; resolved: exactly one). Re-emit the island from your decision blocks.
