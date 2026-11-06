<!--
name: 'Tool Result: Git safety unquoted expansion trailer'
description: Warns that an unquoted shell parameter can expand to zero or multiple words.
ccVersion: 2.1.318
variables:
  - OPTION_NAME
-->
 ${OPTION_NAME} "$x"): as written, it can become no word or several words
