<!--
name: 'Tool Result: Artifact Publish Replacement Character Found'
description: >-
  Warns that the source file contains U+FFFD replacement characters and
  instructs replacing them before publishing.
ccVersion: 2.1.270
variables:
  - CHAR_OFFSET
  - REPUBLISH_INSTRUCTION
-->
file_path: the source file has the replacement character U+FFFD at ${CHAR_OFFSET}, usually left where an earlier edit or paste lost a character. Replace it with the intended text (in HTML, write an intended U+FFFD as &#xFFFD;), ${REPUBLISH_INSTRUCTION}
