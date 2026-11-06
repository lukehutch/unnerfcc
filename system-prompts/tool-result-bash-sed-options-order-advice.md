<!--
name: 'Tool Result: Bash sed options ordering advice'
description: >-
  Advises placing sed options before arguments and attaching suffixes to avoid
  option parsing errors.
ccVersion: 2.1.318
-->
 (sed may stop reading options at the first word that is not an option and run it as the program: put every -e first and attach any -i suffix)
