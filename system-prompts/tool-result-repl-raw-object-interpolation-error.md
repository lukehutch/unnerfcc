<!--
name: 'Tool Result: REPL raw object interpolation error'
description: >-
  Model-facing REPL error fragment explaining that an object with a raw field is
  not a literal {raw: ...} wrapper and how to pass or construct raw shell text
  safely.
ccVersion: 2.1.329
-->
an object with a raw field, but not a one-key {raw: ...} literal written in a script and unchanged since.
It may be outside data, such as parsed JSON, where a string was expected, or a literal whose raw field was set again, so check the value first. ${x.raw} passes its text as one quoted argument. The {raw: ...} form is only for shell text that the script wrote itself: build that string first, then wrap it once.
