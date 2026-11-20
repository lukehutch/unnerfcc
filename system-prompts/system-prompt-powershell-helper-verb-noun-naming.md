<!--
name: 'System Prompt: PowerShell helper Verb-Noun naming'
description: >-
  Model-facing PowerShell guidance to give helper functions Verb-Noun names
  because built-in aliases shadow matching function names without warning.
ccVersion: 2.1.329
-->
Give helper functions a new Verb-Noun name such as Read-Doc, also in script files. A built-in alias (rd, rm, del, ri, sc, mv and others) runs instead of a function with the same name, with no warning.
