<!--
name: 'Tool Result: Bash sed in-place flag portability advice'
description: >-
  Advises using portable -i syntax for sed across macOS, BSD, and GNU
  implementations.
ccVersion: 2.1.318
-->
 (on macOS and BSD, sed takes the word after a bare -i as the backup suffix and a later word as the program: write -i.bak, which every sed reads the same way, or, with BSD sed, -i '' as its own word)
