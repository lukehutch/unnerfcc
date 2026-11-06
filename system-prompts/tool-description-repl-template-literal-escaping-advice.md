<!--
name: 'Tool Description: REPL template literal escaping advice'
description: >-
  Advises using regular quotes or reading from files when handling strings
  containing backticks or interpolation syntax.
ccVersion: 2.1.318
-->
A template literal ends at the next backtick and `${` starts an interpolation, so text that contains either (RST ``code``, a shell ${VAR}, a Python f-string) is safer in a '…' or "…" string, or read from a file.
