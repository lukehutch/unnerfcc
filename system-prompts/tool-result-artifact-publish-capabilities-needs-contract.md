<!--
name: 'Tool Result: Publish declaring capabilities needs contract'
description: >-
  Informs the model that publishing capability declarations requires the current
  contract and explains fallback publishing rules.
ccVersion: 2.1.310
variables:
  - ALLOWED_SESSION_DESCRIPTION
-->
Nothing was published: a publish that declares capabilities needs the current contract from the server. Tell the user that the declaration has to be published from ${ALLOWED_SESSION_DESCRIPTION}. Do not publish without the capabilities field unless every capability the page needs is already stored or the user asks: a declaration already stored carries forward unchanged, but capabilities declared for the first time are not granted, so a page that depends on them will not work. If you do publish without the field (and without contract: 'latest' if you passed it), tell the user which capabilities were not granted.
