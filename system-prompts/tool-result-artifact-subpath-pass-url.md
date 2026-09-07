<!--
name: 'Tool Result: Artifact subpath requires passing artifact URL'
description: >-
  Explains that the argument is a subpath within an artifact and instructs to
  pass the artifact's URL instead.
ccVersion: 2.1.263
variables:
  - ARGUMENT_VALUE
  - URL_DETAIL
  - PARAM_NAME
-->
`${ARGUMENT_VALUE}` names a path inside the artifact — pass the artifact's own URL${URL_DETAIL} as `${ARGUMENT_VALUE}`${PARAM_NAME}.
