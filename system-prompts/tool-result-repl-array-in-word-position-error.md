<!--
name: 'Tool Result: REPL array in single-word position error'
description: >-
  Model-facing REPL error fragment explaining why an array cannot be
  interpolated in a single-word or redirect position and how to format array
  arguments or write files.
ccVersion: 2.1.329
-->
an array, in a place that seems to take one word: it continues a word, as after NAME= or a quote mark, or it follows a redirect such as > or <.
The other items could run as the command or become its arguments. The value may be outside data, such as parsed JSON, where a string was expected, so check it first. With no quotes of your own around them, ${x} after a space passes one argument per item, ${x.join(' ')} passes one word, and ${x.map(s => 'dir/' + s)} puts a prefix on each item. For a file's text, use write() in place of a here-document.
