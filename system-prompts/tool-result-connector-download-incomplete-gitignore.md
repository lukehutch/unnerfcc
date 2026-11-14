<!--
name: 'Tool Result: Connector download folder has incomplete .gitignore'
description: >-
  Model-facing connector download error explaining that an incomplete .gitignore
  in connector-downloads blocks saving files until removed.
ccVersion: 2.1.325
-->
the connector-downloads folder has a .gitignore that doesn't ignore everything (an empty one can be left by an earlier save that stopped partway), so connector files aren't saved there; the person can remove that .gitignore, then run the tool again
