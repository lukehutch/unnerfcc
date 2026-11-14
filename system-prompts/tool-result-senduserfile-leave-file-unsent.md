<!--
name: 'Tool Result: Leave declined file unsent'
description: >-
  Instructs the model to leave the declined file unsent under any name unless
  the user explicitly asks for it via SendUserFile.
ccVersion: 2.1.325
variables:
  - FILE_PATH
-->
 Leave ${FILE_PATH} unsent, under this or any other name and in any other form, unless the person asks for it. If they do, call SendUserFile again: they are asked again, and only their own pick of Send it sends it.
