<!--
name: 'Tool Result: Bash date arithmetic portability advice'
description: >-
  Advises using date +%s or external tools like bc or awk to avoid date format
  incompatibilities in shell arithmetic.
ccVersion: 2.1.318
-->
 (if this value comes from date: some versions print %N and %q as a letter and others leave them unchanged, and arithmetic can read either as a variable. To pass: use date +%s, or do the sum in bc or awk)
